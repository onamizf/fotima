// Короткие подписи проверенного учебного прогресса.
const accountText={ru:{checked:'Проверено',complete:'Все уровни пройдены'},en:{checked:'Checked',complete:'All levels complete'},'uz-Latn':{checked:'Tekshirildi',complete:'Barcha bosqichlar bajarildi'},'uz-Cyrl':{checked:'Текширилди',complete:'Барча босқичлар бажарилди'}};
function au(){return accountText[state.settings.language]||accountText.ru;}
