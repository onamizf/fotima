/* Единый вывод интерфейсных иконок. PNG — только из предоставленного набора.
   Схемы приборов, знаки опасности и модели веществ остаются учебными иллюстрациями. */
const Icon=(()=>{
 const names=new Set(['start-experiment','home','topics','games','collection','progress','stats','settings','notifications','search','topic-01-intro','topic-02-states','topic-03-substances','topic-04-mixtures','topic-05-physical','topic-06-chemical','topic-07-atoms','exp-filtration','exp-precipitate','periodic-table','dictionary','tests','random','elements','streak','xp','achievements','rank']);
 const aliases={house:'home',levels:'topics','layout-grid':'topics',gamepad:'games','gamepad-2':'games',grid:'periodic-table','table-2':'periodic-table',book:'dictionary','book-open':'dictionary',quiz:'tests','clipboard-check':'tests','settings-2':'settings','chart-no-axes-column':'progress',star:'xp',trophy:'achievements',timer:'random'};
 function render(name,size=20){
  const key=aliases[name]||name,px=Number.isFinite(Number(size))?Math.max(12,Math.min(134,Number(size))):20;
  if(!names.has(key))return HomeIcon(name,20);
  return `<img class="site-icon" data-icon="${key}" src="assets/icons/${key}.png" width="${px}" height="${px}" style="--icon-size:${px}px" alt="" aria-hidden="true" loading="lazy" draggable="false">`;
 }
 // Иконка опыта задаётся в его данных; по умолчанию берётся поле icon родительской темы.
 render.experimentName=(exp,topic)=>exp?.icon||topic?.icon||CourseData.topics.find(t=>t.steps.experiments.some(e=>e.id===exp?.id))?.icon||'start-experiment';
 render.experiment=(exp,topic,size=44)=>render(render.experimentName(exp,topic),size);
 render.locked=(name,size,locked=false)=>`<span class="icon-stack ${locked?'icon-is-locked':''}" style="--icon-size:${size}px">${render(name,size)}${locked?`<span class="icon-lock">${render('lock',20)}</span>`:''}</span>`;
 render.serviceTile=(name,size=32)=>`<span class="service-icon-tile" style="--icon-size:${size}px">${render(name,20)}</span>`;
 render.notice=n=>n.type==='topic'?CourseData.topics.find(t=>'#topic/'+t.id===n.link)?.icon||'topics':({badge:'achievements',rank:'rank',streak:'streak',system:'notifications'})[n.type]||'notifications';
 // Старые сохранённые уведомления тоже отображаются без прежних декоративных эмодзи.
 render.text=text=>String(text).replace(/[🔥⭐🏆🏅]\uFE0F?/gu,'').trim();
 return render;
})();
