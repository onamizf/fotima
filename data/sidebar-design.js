/* Только подписи навигации; учебные статусы и профиль читаются из прежних моделей. */
const SidebarCopy={
 ru:{logout:'Выйти',menu:'Меню',learning:'Обучение',laboratory:'Моя лаборатория',more:'Ещё',collection:'Моя коллекция веществ',new:'Новое',grade:'7 класс',guest:'Гость',userMenu:'Меню пользователя',completed:'Пройдено тем: {n} из {total}',collapse:'Свернуть меню',expand:'Развернуть меню',close:'Закрыть меню',progress:'Прогресс'},
 'uz-Latn':{logout:'Chiqish',menu:'Menyu',learning:'Ta’lim',laboratory:'Laboratoriyam',more:'Yana',collection:'Moddalar to‘plamim',new:'Yangi',grade:'7-sinf',guest:'Mehmon',userMenu:'Foydalanuvchi menyusi',completed:'Tugatilgan mavzular: {n} / {total}',collapse:'Menyuni yig‘ish',expand:'Menyuni kengaytirish',close:'Menyuni yopish',progress:'Natijalar'},
 en:{logout:'Log out',menu:'Menu',learning:'Learning',laboratory:'My laboratory',more:'More',collection:'My substance collection',new:'New',grade:'Grade 7',guest:'Guest',userMenu:'User menu',completed:'Completed topics: {n} of {total}',collapse:'Collapse menu',expand:'Expand menu',close:'Close menu',progress:'Progress'}
};
const SidebarText=(key,params={})=>CourseModel.text(Object.fromEntries(Object.entries(SidebarCopy).map(([lang,copy])=>[lang,copy[key]||key]))).replace(/\{(\w+)\}/g,(_,k)=>params[k]??'');
