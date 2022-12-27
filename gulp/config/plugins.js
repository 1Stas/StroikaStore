import replace from 'gulp-replace'; //Поиск и замена
import plumber from 'gulp-plumber'; // Обработка ошибок
import notify from 'gulp-notify';   // Сообщения (подсказки)
import browsersync from 'browser-sync'; // Локальный сервер
import newer from 'gulp-newer'; // Проверяет обновилась ли картинка
import ifPlugin from 'gulp-if'; // Условное ветвление

export const plugins = {
	replace: replace,         // можно просто писать ключи, без значений они равны себе {replace, plumber, notify, ...}
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}