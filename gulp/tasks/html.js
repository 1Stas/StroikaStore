import fileinclude from "gulp-file-include";  // Только для сборки на html
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

export const html = () => {		// Экспорт для использования функции
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(         // Выдает ошибку
			app.plugins.notify.onError({   // Выводит ошибку в windows должны быть вкл уведомления
				'title': 'HTML',
				'message': 'Error: <%= error.message %>'
			}))
		)
		//.pipe(fileinclude())          // Собираем в один файл (данная строка необходима для сборки на html)
		.pipe(pug({                                        // Блок для сборки на pug {
			pretty: true,                                  // минификация файлов
			verbose: true,                                 // показывать в терминале какой файл обработан
		}))                                                //  }
		.pipe(app.plugins.replace(/@img\//g, '/img/')) // Заменяем @img на img
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({       // Антикеш браузера
					'value': '%DT%',  // шаблон файла ключа, просто время дата
					'append': {
						'key': '_v',  //    <link rel="stylesheet" href="css/style.min.css">
						'cover': 0,   //    Добавляется ключ ?_v=20220211164856
						'to': [
							'css',    //    <link rel="stylesheet" href="css/style.min.css?_v=20220211164856">
							'js',     //    <script src="js/app.min.js?_v=20220211164856"></script>
						]
					},
					'output': {
						'file': 'gulp/version.json', // уникальный файл ключ, который отличает разные сборки, предотваращая кеширование
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}