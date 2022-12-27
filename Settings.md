<!--
Урок из ютуба канал "Фрилансер по жизни - IT фриланс" https://www.youtube.com/watch?v=jU88mLuLWlk

Создаем папку Gulp-2022 запускаем терминал в ней

npm init
	отвечаем на всё пропуском, можно автор любое имя дописать
	в конце Y появился package.json
	меняем в нем строку main на gulpfile.js
	под main пишем "type": "module", переход на модульный тип позволит импортировать пакеты последних версий
	Получили файл:
	{
	  "name": "gulp-2022",
	  "version": "1.0.0",
	  "description": "",
	  "main": "gulpfile.js",
	  "type": "module",
	  "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "fls",
	  "license": "ISC"
	}

Ставим gulp глобально
	npm i gulp-cli -g

При отказе работать с ES6 синтаксом и получении ошибки
	import gulp from 'gulp';
	^^^^^^
	SyntaxError: Cannot use import statement outside a module
	Устанавливаем
		npm i @babel/preset-env @babel/register -D
	Переназываем основной файл галпа
		gulpfile.babel.js
	Добавляем в корень проекта файл
		.babelrc
		В него вставляем
			{
				"presets": [
				"@babel/preset-env"
				]
			}

Устанавливать плагины можно все сразу через пробел
	Флаг -D означает Dependencies, только для этого проекта
	npm i -D gulp-notify gulp-del gulp-plumber ...

Ставим gulp локально для зависимостей
	npm i gulp -D
	Появилась папка node_modules и package-lock.json
	Так же в package.json добавилась строка
	"devDependencies": {
	  "gulp": "^4.0.2"
	}

Создаем файл gulpfile.js в корне
	Папку src исходники
	Папку gulp внутри внутри много разных файликов.

npm i -D del
	в package.json появилась строка
	"del": "^6.0.0",

Плагин позволяет собирать в один html файл другие, типа head + header + footer = index.html
	npm i -D gulp-file-include
	"gulp-file-include": "^2.3.0",

!---Можно обойтись без этих двух частей, просто создав доп файлы, типа header footer, для html в одной дирректории c index.html
Расширение VS Code Path Autocomplete необходимо для выравнивания путей при сборке файлов в один index.html
	Например в index.html входит header.html
	в перевом путь до иконки img/cover.jpg во втором ../img/cover.jpg они оба будут в одном index.html
	img/cover.jpg
	../img/cover.jpg
	Что конечно не позволит отобразить один из них
	Жмем F1 в settings.json вставляем
	"path-autocomplete.pathMappings": {
		"@img": "${folder}/src/img",
		"@scss": "${folder}/src/scss",
		"@js": "${folder}/src/js",
	}
	Теперь для пути ../img мы будем писать @img, редактор же будет заменять их на ${folder}/src/img,
	в переменную ${folder} = @img, пишем в html так
	<img src="@img/cover.jpg" alt="disk"> при сборке он конечно так же всё и оставит

Переходим ко второй части донастройки при сборке
	npm i -D gulp-replace
	"gulp-replace": "^1.1.3",
	В package.jsom появилась строка
	"gulp-replace": "^1.1.3"
	В файле html.js заменяет через регулярку @img на img

Подключаем gulp-webp-html-nosvg конвертирует картинки в webp формат
	npm i -D gulp-webp-html-nosvg
	"gulp-webp-html-nosvg": "^1.0.5"
	В index.html из
	<img src="@img/cover.jpg" alt="disk">
	получим
	<picture><source srcset="img/cover.webp" type="image/webp"><img src="img/cover.jpg" alt="disk"></picture>

Добавляет ключ к файлам сборки, чтобы они не кешировались в браузере и всегда были видны изменения
	npm i -D gulp-version-number
	"gulp-version-number": "^0.2.4",
	Будет создавать файл version.json для хранения уникального кеш ключа
	Пример первой генерации version.json
	{
		"main": "20220211164856"
	}
	В сборке index.html изменилась строка
	<link rel="stylesheet" href="css/style.min.css?_v=20220211164856">
	Тоже в скриптах
	<script src="js/app.min.js?_v=20220211164856"></script>

Обработчик ошибок
	"gulp-plumber": "^1.2.1",
	npm i -D gulp-plumber

Сообщения (подсказки), о тех же ошибках. Выводит ошибку в windows должны быть вкл уведомления
	"gulp-notify": "^4.0.0",
	npm i -D gulp-notify
	Для проверки можно @@include('html/header.htl', {}) убрать букву в htl и перезапустить gulp
	В консоли будет
	gulp-notify: [HTML] Error: ENOENT: no such file or directory, open '~\Gulp-2022\src\html\header.htl'

Pug если используем в работе надо подключить
	npm i -D gulp-pug
	В файле path.js меняем расширения с html на pug
		html:  `${ srcFolder }/*.html`,
		html:  `${ srcFolder }/*.pug`,
		и
		html:  `${ srcFolder }/files/**/*.*`,
		html:  `${ srcFolder }/files/**/*.pug`,
	импортируем в файл html.js галп паг
		import pug from "gulp-pug";
		комментируем строку и заменяем
			// .pipe(fileinclude())
			в задаче
				const html = () => {}
			Заменяем на
				.pipe(pug({
					pretty: true, // минификация файлов
					verbose: true, // показывать в терминале какой файл обработан
				}))
				Все свойства можно посмотреть https://openbase.com/js/gulp-pug/documentation

Локальный сервер для автообновления страницы
	Опции https://browsersync.io/docs/options
	npm i -D browser-sync

Удаление папки node modules
	Устанавливаем npm install rimraf -g
	Удаляем командой rimraf node_modules

Обновление всех модулей, так же устанавливает все зависимости из файла package.json
	npm up -D

Устанавливаем sass с плагином для его запуска на gulp
	npm i -D gulp-sass sass

Для переименования в папке dist файла css
	npm i -D gulp-rename

Для сжатия, вебп изображений, префиксов, группировки медиа запросов
	npm i -D gulp-clean-css gulp-webpcss gulp-autoprefixer gulp-group-css-media-queries

	Есть плагин webp-css с пробелом его проблема в том, что он интегрирует в браузер также svg изображения, а также не поддерживает браузер сафари на устройствах apple
	В webpcss нам необходимо определять поддерживает ли браузер webp, присваивая ему классы webp  no-webp, но для этого надо установить конвертер
		npm i -D webp-converter@2.2.3

Для сборки всех js файлов проекта с учетом их export import необходимо подключить сам webpack и модуль отвечающий за сборку webpack-stream
	npm i -D webpack webpack-stream

Так же можно подключать модули из папки node_modules для примера можно установить swiper модуль для слайдеров
	npm i -D swiper
	https://swiperjs.com/get-started

Обработка webp и сжатие картинок, проверка обновления картинок
	npm i -D gulp-webp gulp-imagemin gulp-newer

Работа со шрифтами
	npm i -D gulp-fonter gulp-ttf2woff2

В fonts.js необходимо удалять файл /scss/fonts.scss для обновления шрифтов после подключения новых

Svg
	npm i -D gulp-svg-sprite
	Заменим в файле package.json строку
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		},
		на
		"scripts": {
			"dev": "gulp", // для запуска в режиме разработчика через npm run dev
			"svgSprive": "gulp svgSprive"
		},
	Теперь чтобы запустить команду наберем в консоли
		npm run svgSprive

If gulp обычные условия if else
	npm i -D gulp-if

Gulp zip для архивации проекта
	npm i -D gulp-zip

Vinyl ftp для отправки файлов на сервер и util для отображения что отправлено
	npm i -D vinyl-ftp gulp-util

В файле package.json в разделе devDependencies необходимо
	"webp-converter": "^2.2.3", заменить на     "webp-converter": "2.2.3", убрав ^
	так же можно изменить все версии плагинов на latest
		"webpack": "latest",
		это позволит при открытии нового проекта устанавливать сразу послдние версии, могут быть проблемы несовместимости.

Для создания нового проекта надо скопировать папки и фалйы
	gulp         папка
	src          папка
	.gitignore   файл
	gulpfile.js  файл
	package.json файл
	В папке нового проекта открываем терминал пишем
		npm i
		По этой команде все плагины из devDependencies будут установлены

Заметка:
	1. Сильно надоедают сообщения, поэтому поотключал в тасках  .pipe(app.plugins.plumber().
	2. Gulp очень быстро реагирует на изменения и терминал кишит ошибками.
	Установил задержку на обработку html, scss, js добавив в gulpfiles.js в функцию: function watcher() {
		gulp.watch(path.watch.files, {delay: 3000}, copy);} здесь 3 секунды, за это время успеваю набрать команду.

Мультистраничность
В блоке про html заявлена мультистраничность, однако в дальнейшем она не реализована.
	Стили и скрипты подключаются универсальные для всех страниц.
	Как это доделать?
	Во-первых, в path в src для стилей пишем следующее: scss: `${srcPath}/scss/*.scss`. Это позволит обрабатывать и переносить все scss файлы.

	Для скриптов в js.js пишем так:
	import webpack from 'webpack-stream'
	import babel from 'gulp-babel'
	import named from 'vinyl-named'
	import rename from 'gulp-rename'

	export const js = () => {
		return app.gulp.src(app.paths.src.js, { sourcemaps: app.isDev })
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(named())
			.pipe(webpack({
				mode: app.isBuild ? 'production' : 'development',
			}))
			.pipe(rename({
				extname: '.min.js'
			}))
			.pipe(app.gulp.dest(app.paths.build.js))
			.pipe(app.plugins.browserSync.stream())
	}
	То есть убираем output и добавляем .pipe(named()) и .pipe(rename({extname: '.min.js'})). Чтобы была множественная миграция js-файлов с поддержкой es6 import.

Скрыть файлы из проводника типа node modules gitignore и др
	https://qastack.ru/programming/30140112/how-do-i-hide-certain-files-from-the-sidebar-in-visual-studio-code

	Можно просто установить расширение Make Hidden (рекоменд)

	Можно лезть в настройки, придется каждый раз как хочешь вынуть из инвиза файл

	Вы можете настроить шаблоны для скрытия файлов и папок из проводника и поиска.
	Откройте Настройки пользователя VS (Главное меню:) File > Preferences > Settings. Откроется экран настроек.
	Искать files:exclude в поиске вверху.

Подскажите, в режиме билд такая ошибка:
	gulp-notify: [HTML] Error: Callback called multiple times
	(node:5044) [DEP0097] DeprecationWarning: Using a domain property in MakeCallback is deprecated. Use the async_context variant of MakeCallback or the AsyncResource class instead. (Triggered by calling processImmediate on process.)
	(Use `node --trace-deprecation ...` to show where the warning was created)
	[gulp-version-number] Output to file: gulp/version.json

	The following tasks did not complete: build, <series>, <parallel>, html
	Did you forget to signal async completion?

	Убедитесь что тег img написан в одну строку, путь к картинке указан без кириллицы и пробелов.















 -->