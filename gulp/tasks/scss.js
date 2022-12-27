import dartSass from 'sass';      // препроцессор sass
import gulpSass from 'gulp-sass'; // плагин для запуска препроцессора sass
import rename from 'gulp-rename'; // переименовывает файл в папке dist

import cleanCss from 'gulp-clean-css'; // Сжатие css файла
import webpcss from 'gulp-webpcss'; // Вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов те что @media (max-width: 768), записав несколько таких запросов в разных местах мы в итоге получим один со всеми параметрами

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // map нужен для понимания из какого файла пришел стиль, если файлов несколько
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({  // оработка ошибок и где они возникли
				title: 'SCSS',
				message: 'Error: <%= error.message %>',
			})
		))
		.pipe(app.plugins.replace(/@img\//g, '../img/')) // обработка алиасов (псевдонимов) .. выходим из scss и заходим в img
		.pipe(sass({
			outputStyle: 'expanded', // будет ли сжат файл после компиляции
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowsersList: ['last 3 versions'],
					cascade: true,
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss({
					webpClass: '.webp',      // если браузер поддреживает webp будет добавляться класс webp
					noWebpClass: '.no-webp', // иначе добавит класс no-webp
				})
			)
		)
		// Раскоментировать если нужен не сжатый дубль файла css, будет два style.css и style.min.css
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: '.min.css', // переименовывает файл в папке dist дописывая min.css
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}