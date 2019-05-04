## Для работы потребуется
- [Node.js](https://nodejs.org/) - чтобы устанавливать пакеты, в том числе и плагины для GULP
    - Есть аналог [Yarn](https://yarnpkg.com/ru/), он хоть и быстрее, но мне лично нравится меньше
- [Git](https://gitforwindows.org) - для работы некоторых плагинов (а точнее [bower](https://bower.io))
- [ConEmu](https://conemu.github.io) - консоль; для удобной работы с GULP

## Если вдруг нет GULP
(либо был установен, но вы хотите переустановить)

- Удаляем GULP глобально:

`npm rm -g gulp`

`npm rm -g gulp-cli`

- Удаляем GULP локально:

`npm rm --save-dev gulp`

`npm rm --save-dev gulp-cli`

`npm rm --save gulp`

`npm rm --save gulp-cli`

- Устанавливаем GULP глобально:

`npm install -g gulpjs/gulp-cli`

- Создаем файл package.json:

`npm init`

- Устанавливаем GULP локально:

`npm install --save-dev gulpjs/gulp`

- Устанавливаем GULP плагины (зависимости):
(сразу все, ниже можно прочитать про все плагины отдельно)

`npm install --save-dev gulp-pug gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat gulp-cssnano gulp-htmlmin gulp-uglify gulp-imagemin imagemin-pngquant imagemin-mozjpeg imagemin-zopfli gulp-svgmin gulp-strip-comments gulp-uncss gulp-svgstore gulp-cached fancy-log chalk browser-sync bower gulp-autoprefixer gulp-rename del gulp-plumber# gulp`

## Плагины
(все, что ~~вычеркнуто~~, не используется, это просто интересные и полезные, относительно, плагины)

**Компиляция:**
- [gulp-pug](https://github.com/gulp-community/gulp-pug "gulp-pug") - компиляция PUG в HTML
- [gulp-sass](https://github.com/dlmanning/gulp-sass "gulp-sass") - компиляция SASS в CSS

**Транспиляция:**
- [gulp-babel](https://github.com/babel/gulp-babel "gulp-babel") - конвертирует ES6/ES7 в ES5
Конкатенация:
- [gulp-concat](https://github.com/wearefractal/gulp-concat "gulp-concat") - конкатенация файлов

**Минификация:**
- [gulp-cssnano](https://github.com/ben-eb/gulp-cssnano "gulp-cssnano") - CSS минификатор
   - ~~[gulp-csso](https://github.com/ben-eb/gulp-csso "gulp-csso")~~ - CSS минификатор
   - ~~[gulp-clean-css](https://github.com/scniro/gulp-clean-css "gulp-clean-css")~~ - CSS минификатор
- [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin "gulp-htmlmin") - HTML минификатор
- [gulp-uglify](https://github.com/terinjokes/gulp-uglify "gulp-uglify") - JavaScript компрессор
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin "gulp-imagemin") - минификация изображений формата PNG, JPEG, GIF и SVG (для SVG используется [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin)
   - [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant "imagemin-pngquant") - плагин для gulp-imagemin
   - [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg "imagemin-mozjpeg") - плагин для gulp-imagemin
   - [imagemin-zopfli](https://github.com/imagemin/imagemin-zopfli "imagemin-zopfli") - плагин для gulp-imagemin
- [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin "gulp-svgmin") - минификация SVG
- [gulp-strip-comments](https://github.com/RnbWd/gulp-strip-comments "gulp-strip-comments") - удаляет комментарии из JSON, JavaScript, CSS, HTML и т.д.

**Оптимизация:**
- [gulp-uncss](https://github.com/ben-eb/gulp-uncss "gulp-uncss") - анализирует HTML код и находит все неиспользуемые и продублированные стили, затем оптимизирует их
- [gulp-svgstore](https://github.com/w0rm/gulp-svgstore "gulp-svgstore") - Объединение SVG файлов в один `<symbol>` элемент

**Линтинг:**
- ~~[gulp-csslint](https://github.com/lazd/gulp-csslint "gulp-csslint")~~ - CSS линтер
- ~~[gulp-htmlhint](https://github.com/bezoerb/gulp-htmlhint "gulp-htmlhint")~~ - HTML валидатор
- ~~[gulp-jshint](https://github.com/spalger/gulp-jshint "gulp-jshint")~~ - поиск ошибок и потенциальных проблем в JavaScript
- ~~[gulp-jscs](https://github.com/jscs-dev/gulp-jscs "gulp-jscs")~~ - JavaScript Code Style. проверка кода в соответствии с существующими стайлгайдами от jQuery, Яндекса, Google, Airbnb и других
- ~~[gulp-plato](https://github.com/sindresorhus/gulp-plato "gulp-plato")~~ - предоставляет аналитику по коду с разными метриками в виде красивых графиков
- ~~[gulp-complexity](https://github.com/alexeyraspopov/gulp-complexity "gulp-complexity")~~ - проверка на качество кода основанная на алгоритмах Halstead и Cyclomatic
- ~~[gulp-jscpd](https://github.com/yannickcr/gulp-jscpd "gulp-jscpd")~~ - для поиска дубликатов в коде

**Кэширование:**
- ~~[gulp-changed](https://github.com/sindresorhus/gulp-changed "gulp-changed")~~ - не надо больше тратить время на обработку неизмененных файлов
- [gulp-cached](https://github.com/contra/gulp-cached "gulp-cached") - простой кэщ файлов в памяти
- ~~[gulp-remember](https://github.com/ahaurw01/gulp-remember "gulp-remember")~~ - кэширует файлы
- ~~[gulp-newer](https://github.com/tschaub/gulp-newer "gulp-newer")~~ - позволяет работать только с измененным файлами, не трогая неизменненые

**Логирование:**
- [fancy-log](https://github.com/gulpjs/fancy-log "fancy-log") - удобное логирование в консоли
- [chalk](https://github.com/chalk/chalk "chalk") - ANSI цвета в консоли

**Красивый код:**
- ~~[gulp-csscomb](https://github.com/koistya/gulp-csscomb "gulp-csscomb")~~ - облагораживает структуру CSS (делает код красивым)
- ~~[gulp-jsbeautifier](https://github.com/tarunc/gulp-jsbeautifier "gulp-jsbeautifier")~~ - делает код JS красивым
- ~~[gulp-html-beautify](https://github.com/colynb/gulp-html-prettify "gulp-html-beautify")~~ - делает структуру HTML красивой

**Разное:**
- [browser-sync](https://browsersync.io "browser-sync") - создает подключение, после чего производит автообновление страницы во всех браузерах на всех устройствах при изменениями не только клиентских или даже серверных файлов. Плюс ко всему синхронизирует позицию скроллинга и заполненные данные в формах.
- [bower](https://bower.io "bower") - менеджер пакетов. Позволяет устанавливать в проект различные библиотеки (пакеты) одной командой (JQuery, Bootstrap, Font Awesome и т.д.)
- [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer "gulp-autoprefixer") - автоматически расставляет префиксы к CSS свойствам, исходя из статистики [caniuse](https://caniuse.com "Can i use... Support tables for HTML5, CSS3, etc")
- [gulp-rename](https://github.com/hparra/gulp-rename "gulp-rename") - переименовывание файлов
- [del](https://github.com/sindresorhus/del "del") - удаление файлов и папок
- [gulp-plumber](https://github.com/floatdrop/gulp-plumber "gulp-plumber") - не останавливает выполнение кода из-за ошибок в .pipe()
- ~~[gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps "gulp-sourcemaps")~~ - создает sourcemap (карту кода)
- ~~[gulp-prompt](https://github.com/Freyskeyd/gulp-prompt#readme "gulp-prompt")~~ - добавляет взаимодействие с GULP через консоль
