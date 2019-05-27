# Gulp шаблон для Frontend-разработки

**Addon. Маленькая утилита [builder](https://github.com/coolpanda02/builder "builder") для сборки проектов из проектов (как бы это странно не звучало). Работает только с этим шаблоном**

## Особенности

- Используется шаблонизатор [PUG](https://pugjs.org/ "PUG")
- Используется препроцессор [SASS](https://sass-lang.com "SASS")
- Используется методология [БЭМ](https://ru.bem.info/ "БЭМ")
   - Используется плагин [posthtml-bem](https://github.com/rajdee/posthtml-bem "posthtml-bem") для более удобного использования [PUG](https://pugjs.org/ "PUG") и [БЭМ](https://ru.bem.info/ "БЭМ")

## Для работы потребуется
- [Node.js](https://nodejs.org/ "Node.js") - чтобы устанавливать пакеты, в том числе и плагины для GULP
    - Есть аналог (для установки пакетов) [Yarn](https://yarnpkg.com/ru/ "Yarn"), он хоть и быстрее, но мне лично не нравится
- [Git](https://gitforwindows.org "Git") - для работы некоторых плагинов (а точнее [bower](https://bower.io "Bower"))
- [ConEmu](https://conemu.github.io "ConEmu") - консоль; для удобной работы с GULP

## Установка
**Если вдруг нет GULP, либо был установен, но вы хотите переустановить, то**

- Удаляем GULP глобально:

`npm rm -g gulp`

`npm rm -g gulp-cli`

- Удаляем GULP локально:

`npm rm -D gulp`

`npm rm -D gulp-cli`

`npm rm -S gulp`

`npm rm -S gulp-cli`

- Устанавливаем GULP глобально:

`npm i -g gulpjs/gulp-cli`

**Теперь для проекта просто создаем папку, в которой делаем следующее:**

- Скачиваем репозиторий - выполняем в консоли `git clone https://github.com/coolpanda02/gulp` (скачается репозиторий с гитхаба, можно скачать вручную; не забудьте, при скачивании создается отдельная папка, поэтому содержимое от туда перемещаем в рабочую папку)

- Создаем файл `package.json`:

`npm init`

- Устанавливаем GULP локально и плагины (зависимости) для него:
(сразу все, ниже можно прочитать про все плагины отдельно)

`npm i -D gulpjs/gulp gulp-pug gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat gulp-cssnano gulp-htmlmin gulp-uglify gulp-imagemin imagemin-pngquant imagemin-mozjpeg imagemin-zopfli gulp-svgmin gulp-cheerio gulp-strip-comments gulp-svgstore fancy-log chalk browser-sync bower gulp-autoprefixer gulp-rename del gulp-plumber gulp-posthtml posthtml-bem exec-sh`

## Команды GULP

**Все опции вы можете настроить в `gulpfile.js`**

**Команды разработки:**
- При разработке используется только папка `../app`, т.е. все действия с файлами происходят там. При сборке все названия папок и их иерархия остаются такими же
- **`gulp`** - основная команда. "Начинает разработку" - очищает все ненужное, перекомпилирует все самое важное и запускает локальный сервер. Также запускает "наблюдатель" - автообновление страниц
- `pugCompile` - компилирование `.pug` и `.jade` файлов в папку `..app/` (Исключение: `_*.{pug,jade}` - эти файлы не компилируются, они нужны только для разработки)
- `sassCompile` - компилирование `.sass` и `.scss` файлов в папке `..app/sass` и минификация в их в папку `..app/css` (Исключение: `_*.{sass,scss}` - эти файлы не компилируются, они нужны только для разработки)
- `concatCss` - конкатенирует все CSS библиотеки в один файл `..app/css/libs.min.css` и минифицирует его
   - Пути к библиотекам находятся в файле `..gulpfile.js` в переменной `libsCss`
- `concatJs` - конкатенирует все JS библиотеки в один файл `..app/js/libs.min.js` и минифицирует его
   - Пути к библиотекам находятся в файле `..gulpfile.js` в переменной `libsJs`
- `createSprite` - минифицирует и объединяет все `.svg` файлы, находяещиеся в папке `..app/img`, в один файл `..app/img/sprite.svg` (он автоматически инжектится в страницу, в файле `../app/_dev.pug` (если вы его не удалили) есть миксин для вставки SVG по методологии [БЭМ](https://ru.bem.info "БЭМ"))
   - `+icon(name, modificators)` - вставить SVG, где `name` - имя файла, `modificators` - массив модификаторов (см. [БЭМ](https://ru.bem.info "БЭМ"))
   - **Например:**
   - `+icon('hamburger', [])` - вставит `<svg class="icon icon_icon--hamburger"><use xlink:href="#icon-hamburger">...</use></svg>`
   - `+icon('school', ['red', 'light'])` - вставит `<svg class="icon icon_icon--school icon_red icon_light"><use xlink:href="#icon-school">...</use></svg>`
   - `+icon('facebook', ['green', 'size_big'])` - вставит `<svg class="icon icon_icon--facebook icon_green icon_size_big"><use xlink:href="#icon-facebook">...</use></svg>`
- `createSpriteEmpty` - аналогичен `createSprite`, разве что удаляет атрибуты `style`, `fill` и `stroke` из файлов, для того чтобы они не перебивали стили, заданные через css
   - `+icon-empty(name, modificators)` - вставить SVG, где `name` - имя файла, `modificators` - массив модификаторов (см. [БЭМ](https://ru.bem.info "БЭМ"))
   - **Например:**
   - `+icon-empty('hamburger', [])` - вставит `<svg class="icon icon_icon-empty icon_icon-empty--hamburger"><use xlink:href="#icon-empty-hamburger">...</use></svg>`
   - `+icon-empty('school', ['red', 'light'])` - вставит `<svg class="icon icon_icon-empty icon_icon-empty--school icon_red icon_light"><use xlink:href="#icon-empty-school">...</use></svg>`
   - `+icon-empty('facebook', ['green', 'size_big'])` - вставит `<svg class="icon icon_icon-empty icon_icon-empty--facebook icon_green icon_size_big"><use xlink:href="#icon-empty-facebook">...</use></svg>`
- `liveReload` - инициализация локального сервера и синхронизации с браузером
   - в файл `..gulpfile.js` есть переменная `indexFile` (по умолчанию `indexFile = 'index.html'`), которая управляет главной страницей сайта при инициализации локального сервера
- `clearApp` - удаляет папку `..app/css` и все файлы по шаблону `..app/**/*.{html,htm}`
   - регулировать этим можно из файла `..gulpfile.js` в переменной `toDeleteApp`
- `clearDest` - удаляет папку `..dest`
   - регулировать этим можно из файла `..gulpfile.js` в переменной `toDeleteDest`
- `clearDestWithoutImg` - в папке `..dest` удаляет все, кроме папки `..dest/img` (папки с изображениями)
   - регулировать этим можно из файла `..gulpfile.js` в переменной `toDeleteDestWithoutImg`
- `clearDestOnlyImg` - в папке `..dest` удаляет только папку `..dest/img` (папку с изображениями)
   - регулировать этим можно из файла `..gulpfile.js` в переменной `toDeleteDestOnlyImg`
- `clearAll` - `clearApp`, `clearDest` вместе взятые
- `watcher` - инициализирует "наблюдателя" - автообновление страниц (также вызвается `liveReload`)
   - при изменении `.sass`, `.scss` файлов выполняется `sassCompile` и файы как бы инжектятся в страницу в браузере (страница не обновляется, а стили обновляются)
   - при изменении `.pug`, `.jade` файлов выполняется `pugCompile`
   - при изменении `.html`, `.htm` файлов выполняется перезагрузка страниц в браузере
   - при изменении `.js` файлов в папке `..app/js` выполняется перезагрузка страниц в браузере

**Команды для сборки:**
- `build` - собрать проект:
   - *все в итоге копируется в папку `..dest`*
   - выполяется `clearDest`
   - заново компилируются `.pug` файлы (см `pugCompile`), также минифицируются
   - заново компилируются `.sass` файлы (см `sassCompile`), ~~также оптимизируются (см. [gulp-uncss](https://github.com/ben-eb/gulp-uncss "gulp-uncss"))~~
   - транспилируется и оптимизируется (удаляются комментарии - см. [gulp-strip-comments](https://github.com/RnbWd/gulp-strip-comments "gulp-strip-comments")) файл `..app/js/common.js`
   - заново конкатенируются все CSS библиотеки (см. `concatCss`), также оптимизируются (см. [gulp-uncss](https://github.com/ben-eb/gulp-uncss "gulp-uncss"))
   - заново конкатенируются все JS библиотеки (см. `concatCss`)
   - минифицируются изображения формата `.png`, `.gif`, `.jpg`, `.jpeg` (см. [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin "gulp-imagemin"))
   - выполняется `createSprite`, `createSpriteEmpty`
   - все оставшиеся форматы изображений просто копируются
   - также копируется папка `..app/fonts`
- `buildWithoutImg`
   - выполняет все то же, что и `build`, за исключением работы с изображениями (просто копирует папку с изображениями - `..app/img`)
- `buildOnlyImg`
   - выполняет только работу с изображениями, т.е.:
   - минифицируются изображения формата `.png`, `.gif`, `.jpg`, `.jpeg` (см. [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin "gulp-imagemin"))
   - выполняется `createSprite`, `createSpriteEmpty`
   - все оставшиеся форматы изображений просто копируются
- `--customDest <значение>` - ключ. Позволяет задать папку сборки проекта

## Плагины
Устнавливаются командой `npm i -D <имя пакета>`

(все, что ~~вычеркнуто~~, не используется, это просто интересные и полезные, относительно, плагины)

**Компиляция:**
- [gulp-pug](https://github.com/gulp-community/gulp-pug "gulp-pug") - компиляция [PUG](https://pugjs.org/ "PUG") в HTML
- [gulp-sass](https://github.com/dlmanning/gulp-sass "gulp-sass") - компиляция [SASS](https://sass-lang.com "SASS") в CSS

**Транспиляция:**
- [gulp-babel](https://github.com/babel/gulp-babel "gulp-babel") - конвертирует ES6/ES7 в ES5

**Конкатенация:**
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
- [gulp-cheerio](https://github.com/knpwrs/gulp-cheerio "gulp-cheerio") - позволяет управлять файлами HTML и XML
- [gulp-strip-comments](https://github.com/RnbWd/gulp-strip-comments "gulp-strip-comments") - удаляет комментарии из JSON, JavaScript, CSS, HTML и т.д.

**Оптимизация:**
- ~~[gulp-uncss](https://github.com/ben-eb/gulp-uncss "gulp-uncss")~~ - анализирует HTML код и находит все неиспользуемые и продублированные стили, затем оптимизирует их
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
- ~~[gulp-cached](https://github.com/contra/gulp-cached "gulp-cached")~~ - простой кэщ файлов в памяти
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
- [gulp-posthtml](https://github.com/posthtml/gulp-posthtml "gulp-posthtml") - трансформирует HTML/XML с помощью JS
   - [posthtml-bem](https://github.com/rajdee/posthtml-bem "posthtml-bem") - упрощает использование [БЭМ](https://ru.bem.info/ "БЭМ") в [PUG](https://pugjs.org/ "PUG")
- ~~[exec-sh](https://github.com/tsertkov/exec-sh "exec-sh")~~ - удобная оболочка для работы с `child_process.spawn` (В проекте используется для сборки внутренних проектов, если таковые есть)

## preferences.json
- ключ `exceptions` - массив строк (string) с иключениями. Все файлы и папки указанные здесь исключаются из обработки вообще. Примеры:
   - `somefolder/lol.html` - в проекте в папке `somefolder` файл `lol.html` исключить из обработки
   - `sass/*.*` - в проекте в папке `sass` **все** файлы исключить из обработки
   - `**/*.{htm, scss}` - в проекте исключить все файлы с расширениями `.htm` и `.scss` из обработки
