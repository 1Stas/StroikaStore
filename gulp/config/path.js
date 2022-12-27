// Получаем имя папки проекта
// rootFolder создается автоматически
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist'; // Так же можно использовать rootFolder
const srcFolder = './src';

export const path = { // Экспортируем переменную в gulpfile.js
	build: {          // Запись /**/ проверяем файлы в любых вложенных папках, /*.* любые файлы с любым расширением
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,   // Вставляем сюда из src
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.pug`,  // html: `${ srcFolder }/*.html`, // Для html
		files: `${srcFolder}/files/**/*.*`,   // Берем из ( const srcFolder   = './src' ) папки src
		svgicons: `${srcFolder}/svgicons/*.svg`, // выгружается в папку images
	},
	watch: {                                    // Следим за...
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.pug`, // html:  `${ srcFolder }/files/**/*.*`, // Для html
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder, // Название текущей папки с проектом
	ftp: `test` // Указываем папку на удаленном фтп сервере например test
}



