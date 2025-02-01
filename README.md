# ⚠️ DEPRECATED ⚠️

![No Maintenance Intended](https://img.shields.io/maintenance/no/2020.svg)

# Gulp-шаблон для Frontend-разработки

**Для личного использования. Если вам понравится — почему бы и нет?**  

Дополнительно: небольшая утилита [builder](https://github.com/ilvoron/builder) для сборки проектов из проектов (да, звучит странно). Работает только с этим шаблоном.

## Особенности

- **Шаблонизатор**: [PUG](https://pugjs.org/)
- **Препроцессор**: [SASS](https://sass-lang.com/)
- **Методология**: [БЭМ](https://ru.bem.info/)
  - Используется плагин [posthtml-bem](https://github.com/rajdee/posthtml-bem) для удобной работы с PUG и БЭМ.

## Требования

**Для работы потребуется**:
- [Node.js](https://nodejs.org/) – для установки пакетов (плагинов для Gulp)
- [Git](https://gitforwindows.org/) – для работы некоторых плагинов, например, [bower](https://bower.io/)
- [ConEmu](https://conemu.github.io/) – удобная консоль для работы с Gulp

## Установка

### Удаление старой версии Gulp

Если у вас уже установлен Gulp, рекомендуется удалить его перед установкой новой версии:

```sh
# Если установлен глобально
npm rm -g gulp
npm rm -g gulp-cli
# Если установлен локально
npm rm -D gulp
npm rm -D gulp-cli
npm rm -S gulp
npm rm -S gulp-cli
```

### Установка новой версии Gulp

```sh
# Устанавливаем глобально
npm i -g gulpjs/gulp-cli
```

### Установка проекта

1. **Скачиваем репозиторий**
```sh
git clone https://github.com/coolpanda02/gulp
cd gulp
```

2. **Создаем `package.json`**
```sh
npm init
```

3. **Устанавливаем Gulp и плагины**
```sh
npm i -D gulpjs/gulp gulp-replace gulp-pug gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat gulp-cssnano gulp-htmlmin gulp-uglify gulp-imagemin imagemin-pngquant imagemin-mozjpeg imagemin-zopfli gulp-svgmin gulp-cheerio gulp-strip-comments gulp-svgstore fancy-log chalk browser-sync bower gulp-autoprefixer gulp-rename del gulp-plumber gulp-posthtml posthtml-bem exec-sh
```

## Команды Gulp

| Команда | Описание |
|---------|----------|
| **`gulp`** | Основная команда. Очищает ненужные файлы, компилирует все важные ресурсы, запускает локальный сервер и включает автообновление страниц. |
| `pugCompile` | Компилирует `.pug` и `.jade` файлы в `app/`. Исключение: `_*.{pug,jade}` – эти файлы не компилируются и используются только для разработки. |
| `sassCompile` | Компилирует `.sass` и `.scss` файлы из `app/sass`, минифицирует их и сохраняет в `app/css`. Исключение: `_*.{sass,scss}` – не компилируются и используются только для разработки. |
| `concatCss` | Объединяет все CSS-библиотеки в один файл `app/css/libs.min.css` и минифицирует его. Пути к библиотекам находятся в `gulpfile.js` в переменной `libsCss`. |
| `concatJs` | Объединяет все JS-библиотеки в один файл `app/js/libs.min.js` и минифицирует его. Пути к библиотекам находятся в `gulpfile.js` в переменной `libsJs`. |
| `createSprite` | Минифицирует и объединяет все `.svg` файлы из `app/img` в один `app/img/sprite.svg`. Спрайт автоматически вставляется в страницу. В `app/_dev.pug` (если не удален) есть миксин `+icon(name, [modificators])` для удобного использования. |
| `createSpriteEmpty` | Аналог `createSprite`, но удаляет атрибуты `style`, `fill`, `stroke`, чтобы они не перебивали стили, заданные через CSS. Используется миксин `+icon-empty(name, [modificators])`. |
| `liveReload` | Запускает локальный сервер и синхронизирует его с браузером. Главная страница настраивается в `gulpfile.js` через переменную `indexFile`. |
| `clearApp` | Удаляет `app/css` и все HTML-файлы по шаблону `app/**/*.{html,htm}`. Конфигурируется через `gulpfile.js` в переменной `toDeleteApp`. |
| `clearDest` | Удаляет папку `dest/`. Конфигурируется через `gulpfile.js` в `toDeleteDest`. |
| `clearDestWithoutImg` | Удаляет все в `dest/`, кроме `dest/img`. Настраивается в `toDeleteDestWithoutImg`. |
| `clearDestOnlyImg` | Удаляет только `dest/img`. Настраивается в `toDeleteDestOnlyImg`. |
| `clearAll` | Объединяет `clearApp` и `clearDest`. |
| `watcher` | Запускает автообновление страниц (`liveReload`) и отслеживание изменений:<br>- при изменении `.sass`, `.scss` файлов – выполняется `sassCompile`, и стили обновляются без перезагрузки страницы.<br>- при изменении `.pug`, `.jade` файлов – выполняется `pugCompile`.<br>- при изменении `.html`, `.htm` файлов – перезагружается страница.<br>- при изменении `.js` файлов в `app/js` – перезагружается страница. |

### Команды для сборки

| Команда | Описание |
|---------|----------|
| `build` | Полная сборка проекта в `dest/`. Очистка папки, компиляция `.pug`, `.sass`, транспиляция JS, объединение и минификация файлов, оптимизация изображений, создание SVG-спрайтов. Все ресурсы копируются в `dest/`. |
| `buildWithoutImg` | То же, что `build`, но изображения просто копируются без оптимизации. |
| `buildOnlyImg` | Обрабатывает только изображения: минифицирует `.png`, `.gif`, `.jpg`, `.jpeg`, создает спрайты, копирует остальные форматы. |
| `--customDest <папка>` | Позволяет указать папку для сборки. |

## Используемые плагины

### **Компиляция и транспиляция**
- [gulp-pug](https://github.com/gulp-community/gulp-pug) – компиляция PUG в HTML
- [gulp-sass](https://github.com/dlmanning/gulp-sass) – компиляция SASS в CSS
- [gulp-babel](https://github.com/babel/gulp-babel) – транспиляция ES6/ES7 в ES5

### **Конкатенация (объединение файлов)**
- [gulp-concat](https://github.com/wearefractal/gulp-concat) – объединение файлов

### **Оптимизация и минификация**
#### **CSS:**
- [gulp-cssnano](https://github.com/ben-eb/gulp-cssnano) – минификация CSS
- [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) – автодобавление префиксов в CSS
- [gulp-uncss](https://github.com/ben-eb/gulp-uncss) – удаляет неиспользуемые стили

#### **HTML:**
- [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) – минификация HTML

#### **JavaScript:**
- [gulp-uglify](https://github.com/terinjokes/gulp-uglify) – сжатие JS
- [gulp-strip-comments](https://github.com/RnbWd/gulp-strip-comments) – удаляет комментарии из JSON, JavaScript, CSS, HTML и т.д.

#### **Изображения:**  
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) – сжатие изображений
- [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant) – плагин для оптимизации PNG
- [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) – плагин для оптимизации JPEG
- [imagemin-zopfli](https://github.com/imagemin/imagemin-zopfli) – плагин для оптимизации PNG
- [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin) – минификация SVG
- [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) – создание SVG-спрайта

### **Автообновление и удобство**
- [browser-sync](https://browsersync.io) – автообновление страницы при изменениях
- [gulp-plumber](https://github.com/floatdrop/gulp-plumber) – предотвращение остановки работы при ошибках
- [gulp-rename](https://github.com/hparra/gulp-rename) – переименование файлов

### **Дополнительные утилиты**  
- [gulp-cheerio](https://github.com/knpwrs/gulp-cheerio) – управление HTML и XML-файлами
- [del](https://github.com/sindresorhus/del) – удаление файлов и папок
- [bower](https://bower.io) – менеджер пакетов (JQuery, Bootstrap, Font Awesome и т.д.)
- [gulp-posthtml](https://github.com/posthtml/gulp-posthtml) – трансформирует HTML/XML с помощью JS
- [posthtml-bem](https://github.com/rajdee/posthtml-bem) – упрощает использование БЭМ в PUG

### **Логирование и удобство работы в консоли**  
- [fancy-log](https://github.com/gulpjs/fancy-log) – удобные логи
- [chalk](https://github.com/chalk/chalk) – цветные сообщения в консоли

## Возможные проблемы и их решение

### **Bower не работает**
Установите его глобально:
```sh
npm install -g bower
```

### **BrowserSync не обновляет страницу**
Убедитесь, что в PUG (или HTML) присутствует `<body>`.

## Конфигурация `preferences.json`

Можно исключать файлы и папки из обработки:

```json
{
  "exceptions": [
    "somefolder/lol.html",
    "sass/*.*",
    "**/*.{htm,scss}"
  ]
}
```
