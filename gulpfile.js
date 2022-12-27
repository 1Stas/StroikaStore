// Подключаем модули
// Основной модуль
import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';
// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную, хранит все переменные проекта
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
}

// Импортируем задачи из tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';




// Наблюдатель за изменениями в файлах
function watcher() {
	//gulp.watch(path.watch.files, {delay: 3000}, copy); // Задержка перед запуском 3с
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
	// Если хотим выгружать сразу на сервер
	// gulp.watch(path.watch.files, gulp.series(copy,ftp));
	// gulp.watch(path.watch.html, gulp.series(html,ftp));
	// gulp.watch(path.watch.scss, gulp.series(scss,ftp));
	// gulp.watch(path.watch.js, gulp.series(js,ftp));
	// gulp.watch(path.watch.images, gulp.series(images,ftp));
}

export { svgSprive } // Создадим отдельный от gulp способ запуска задачи. Запуск npm run svgSprive

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)); // Одновременные задачи

// Построение сценариев выполнения задач, выполняем задачи последовательно через метод .series()
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }


// Выполнение сценария по умолчанию
gulp.task('default', dev);