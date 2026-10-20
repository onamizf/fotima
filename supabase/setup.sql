-- Run once in your own Supabase project: SQL Editor -> New query -> Run.
-- No passwords or service keys are embedded here.
begin;
create table if not exists public.lab_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and payload @> '{"version":2}'::jsonb),
  revision integer not null default 1 check (revision > 0),
  updated_at timestamptz not null default now(),
  constraint lab_progress_size check (octet_length(payload::text) <= 1048576)
);
alter table public.lab_progress enable row level security;
revoke all on public.lab_progress from public, anon;
grant select, insert, update on public.lab_progress to authenticated;
drop policy if exists "Read own progress" on public.lab_progress;
create policy "Read own progress" on public.lab_progress for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "Insert own progress" on public.lab_progress;
create policy "Insert own progress" on public.lab_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
drop policy if exists "Update own progress" on public.lab_progress;
create policy "Update own progress" on public.lab_progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
-- Optimistic revision check prevents silent overwriting from another device.
create or replace function public.save_lab_progress(p_payload jsonb, p_expected integer)
returns integer language plpgsql security invoker set search_path = public
as $$
declare next_revision integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_expected is null or p_expected < 0 then raise exception 'Invalid revision'; end if;
  if p_expected = 0 then
    insert into public.lab_progress(user_id, payload) values(auth.uid(), p_payload)
      on conflict (user_id) do nothing returning revision into next_revision;
  else
    update public.lab_progress set payload = p_payload, revision = revision + 1, updated_at = now()
      where user_id = auth.uid() and revision = p_expected returning revision into next_revision;
  end if;
  if next_revision is null then
    raise exception using errcode = '40001', message = 'Progress conflict: load the latest cloud progress first';
  end if;
  return next_revision;
end;
$$;
revoke all on function public.save_lab_progress(jsonb, integer) from public, anon;
grant execute on function public.save_lab_progress(jsonb, integer) to authenticated;
commit;
