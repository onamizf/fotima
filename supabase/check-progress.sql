-- Read-only diagnostics. Run in SQL Editor in the same project used by the site.
-- This script neither deletes data nor disables access protection.
select
  to_regclass('public.lab_progress') is not null as progress_table_exists,
  coalesce((select relrowsecurity from pg_class where oid=to_regclass('public.lab_progress')),false) as rls_enabled,
  to_regprocedure('public.save_lab_progress(jsonb,integer)') is not null as save_function_exists,
  has_schema_privilege('authenticated','public','usage') as authenticated_schema_access,
  coalesce(has_table_privilege('authenticated',to_regclass('public.lab_progress'),'select'),false) as authenticated_read_access;
select column_name,data_type
  from information_schema.columns
  where table_schema='public' and table_name='lab_progress'
  order by ordinal_position;
select policyname,cmd,roles,qual,with_check
  from pg_policies
  where schemaname='public' and tablename='lab_progress'
  order by policyname;
