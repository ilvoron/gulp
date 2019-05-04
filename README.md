!ИНСТРУКЦИЯ ПО УСТАНОВКЕ GULP 4

Для работы потребуется:
	Node.js (чтобы устанавливать пакеты, в том числе и плагины для GULP)
	Git (для работы некоторых плагинов)
	ConEmu (консоль; для работы с GULP)

Если вдруг GULP был до этого установлен (лучше ввести в любом случае)
	Либо (предпочтительнее):
		Для глобального удаления:
			npm rm -g gulp
			npm rm -g gulp-cli
		Для локального удаления
			npm rm --save-dev gulp
			npm rm --save-dev gulp-cli
			npm rm --save gulp
			npm rm --save gulp-cli
			npm rm --save-optional gulp
			npm rm --save-optional gulp-cli
		npm cache clean
	Либо:
		Для глобального удаления:
			npm uninstall -g gulp
			npm uninstall -g gulp-cli
		Для локального удаления
			npm uninstall --save-dev gulp
			npm uninstall --save-dev gulp-cli
			npm uninstall --save gulp
			npm uninstall --save gulp-cli
			npm uninstall --save-optional gulp
			npm uninstall --save-optional gulp-cli
		npm cache clean

Устанавливаем GULP глобально
npm install -g gulpjs/gulp-cli

Создаем файл package.json
npm init

Устанавливаем GULP локально
npm install --save-dev gulpjs/gulp

Устанавливаем плагины для GULP
	Устанавливаем по шаблону (локально):
		npm install --save-dev <навзание_плагина>
	Отдельно каждый:
		Компиляция:
			gulp-pug - компиляция PUG в HTML ( https://github.com/gulp-community/gulp-pug )
			gulp-sass - компиляция SASS в CSS ( https://github.com/dlmanning/gulp-sass )
		Транспиляция:
			gulp-babel - конвертирует ES6/ES7 в ES5 ( https://github.com/babel/gulp-babel )
				Для установки также нужно: @babel/core и @babel/preset-env
		Конкатенация:
			gulp-concat - конкатенация файлов ( https://github.com/wearefractal/gulp-concat )
		Минификация:
			На выбор (CSS минификатор):
				[~] gulp-csso ( https://github.com/ben-eb/gulp-csso )
				[~] gulp-clean-css ( https://github.com/scniro/gulp-clean-css )
				[мой выбор] gulp-cssnano ( https://github.com/ben-eb/gulp-cssnano )
			gulp-htmlmin - HTML минификатор ( https://github.com/jonschlinkert/gulp-htmlmin )
			gulp-uglify - JavaScript компрессор ( https://github.com/terinjokes/gulp-uglify )
			gulp-imagemin - минификация изображений формата PNG, JPEG, GIF и SVG (для него лучше gulp-svgmin) ( https://github.com/sindresorhus/gulp-imagemin )
				Плагины:
				imagemin-pngquant ( https://github.com/imagemin/imagemin-pngquant )
				imagemin-mozjpeg ( https://github.com/imagemin/imagemin-mozjpeg )
				imagemin-zopfli ( https://github.com/imagemin/imagemin-zopfli )
			gulp-svgmin - минификация SVG ( https://github.com/ben-eb/gulp-svgmin )
			gulp-strip-comments - удаляет комментарии из JSON, JavaScript, CSS, HTML и т.д. ( https://github.com/RnbWd/gulp-strip-comments )
		Оптимизация:
			gulp-uncss - анализирует HTML код и находит все неиспользуемые и продублированные стили, затем оптимизирует их ( https://github.com/ben-eb/gulp-uncss )
			gulp-svgstore - Объединение SVG файлов в один <symbol> элемент ( https://github.com/w0rm/gulp-svgstore )
		Линтинг:
			[~] gulp-csslint - CSS линтер ( https://github.com/lazd/gulp-csslint )
			[~] gulp-htmlhint - HTML валидатор ( https://github.com/bezoerb/gulp-htmlhint )
			[~] gulp-jshint - поиск ошибок и потенциальных проблем в JavaScript ( https://github.com/spalger/gulp-jshint )
			[~] gulp-jscs - JavaScript Code Style. проверка кода в соответствии с существующими стайлгайдами от jQuery, Яндекса, Google, Airbnb и других ( https://github.com/jscs-dev/gulp-jscs )
			[~] gulp-plato - предоставляет аналитику по коду с разными метриками в виде красивых графиков ( https://github.com/sindresorhus/gulp-plato )
			[~] gulp-complexity - проверка на качество кода основанная на алгоритмах Halstead и Cyclomatic ( https://github.com/alexeyraspopov/gulp-complexity )
			[~] gulp-jscpd - для поиска дубликатов в коде ( https://github.com/yannickcr/gulp-jscpd )
		Кэширование:
			[~] gulp-changed - не надо больше тратить время на обработку неизмененных файлов ( https://github.com/sindresorhus/gulp-changed )
			gulp-cached - простой кэщ файлов в памяти ( https://github.com/contra/gulp-cached )
			[~] gulp-remember - кэширует файлы ( https://github.com/ahaurw01/gulp-remember )
			[~] gulp-newer - позволяет работать только с измененным файлами, не трогая неизменненые ( https://github.com/tschaub/gulp-newer )
		Логирование:
			fancy-log - удобное логирование в консоли ( https://github.com/gulpjs/fancy-log )
			chalk - ANSI цвета в консоли ( https://github.com/chalk/chalk )
		Красивый код:
			[~] gulp-csscomb - облагораживает структуру CSS (делает код красивым) ( https://github.com/koistya/gulp-csscomb )
			[~] gulp-jsbeautifier - делает код JS красивым ( https://github.com/tarunc/gulp-jsbeautifier )
			[~] gulp-html-beautify - делает структуру HTML красивой ( https://github.com/colynb/gulp-html-prettify )
		Разное:
			browser-sync - создает подключение, после чего производит автообновление страницы во всех браузерах на всех устройствах при изменениями не только клиентских или даже серверных файлов. А плюс ко всему синхронизирует позицию скроллинга и заполненные данные в формах.. ( https://browsersync.io )
			bower - менеджер пакетов. Позволяет устанавливать в проект различные библиотеки (пакеты) одной командой (JQuery, Bootstrap, Font Awesome) ( https://bower.io )
				('.bowerrc' => '{"directory": "app/libs/"}')
			gulp-autoprefixer - автоматически расставляет префиксы к CSS свойствам, исходя из статистики caniuse ( https://github.com/sindresorhus/gulp-autoprefixer )
			gulp-rename - переименовывание файлов ( https://github.com/hparra/gulp-rename )
			del - удаление файлов и папок ( https://github.com/sindresorhus/del )
			gulp-plumber - не останавливает выполнение кода из-за ошибок в .pipe() ( https://github.com/floatdrop/gulp-plumber )
			[~] gulp-sourcemaps - создает sourcemap (карту кода) ( https://github.com/floridoo/gulp-sourcemaps )
			[~] gulp-prompt - добавляет взаимодействие с GULP через консоль ( https://github.com/Freyskeyd/gulp-prompt#readme )
	Установка всего сразу (те плагины, что отмечены [~] не устанавливаются):
		npm install --save-dev gulp-pug gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat gulp-cssnano gulp-htmlmin gulp-uglify gulp-imagemin imagemin-pngquant imagemin-mozjpeg imagemin-zopfli gulp-svgmin gulp-strip-comments gulp-uncss gulp-svgstore gulp-cached fancy-log chalk browser-sync bower gulp-autoprefixer gulp-rename del gulp-plumber# gulp
