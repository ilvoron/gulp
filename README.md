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

`npm install --save-dev gulp-pug gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat gulp-cssnano gulp-htmlmin gulp-uglify gulp-imagemin imagemin-pngquant imagemin-mozjpeg imagemin-zopfli gulp-svgmin gulp-strip-comments gulp-uncss gulp-svgstore gulp-cached fancy-log chalk browser-sync bower gulp-autoprefixer gulp-rename del gulp-plumber# gulp`
