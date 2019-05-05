'use strict';

/*-----------*/
/* Constants */
/*-----------*/

// Basic constants
const { src, dest, series, watch } = require('gulp'); // This is Gulp

// Compilation
const pug  = require('gulp-pug');  // https://github.com/gulp-community/gulp-pug
const sass = require('gulp-sass'); // https://github.com/dlmanning/gulp-sass

// Transpilation
const babel = require('gulp-babel'); // https://github.com/babel/gulp-babel

// Concatenation
const concat = require('gulp-concat'); // https://github.com/wearefractal/gulp-concat

// Minification
const cssnano  = require('gulp-cssnano');        // https://github.com/ben-eb/gulp-cssnano
const htmlmin  = require('gulp-htmlmin');        // https://github.com/jonschlinkert/gulp-htmlmin
const uglify   = require('gulp-uglify');         // https://github.com/terinjokes/gulp-uglify
const imagemin = require('gulp-imagemin');       // https://github.com/sindresorhus/gulp-imagemin
const pngquant = require('imagemin-pngquant');   // https://github.com/imagemin/imagemin-pngquant
const mozjpeg  = require('imagemin-mozjpeg');    // https://github.com/imagemin/imagemin-mozjpeg
const zopfli   = require('imagemin-zopfli');     // https://github.com/imagemin/imagemin-zopfli
const svgmin   = require('gulp-svgmin');         // https://github.com/ben-eb/gulp-svgmin
const strip    = require('gulp-strip-comments'); // https://github.com/RnbWd/gulp-strip-comments

// Optimization
const uncss    = require('gulp-uncss');    // https://github.com/ben-eb/gulp-uncss
const svgstore = require('gulp-svgstore'); // https://github.com/w0rm/gulp-svgstore

// Cashing
const cache = require('gulp-cached'); // https://github.com/gulp-community/gulp-cached

// Logging
const log   = require('fancy-log');  // https://github.com/gulpjs/fancy-log
const chalk = require('chalk');      // https://github.com/chalk/chalk

// Miscellaneous
const browserSync  = require('browser-sync').create(); // https://browsersync.io
const autoprefixer = require('gulp-autoprefixer');     // https://github.com/sindresorhus/gulp-autoprefixer
const rename       = require('gulp-rename');           // https://github.com/hparra/gulp-rename
const del          = require('del');                   // https://github.com/sindresorhus/del
const plumber      = require('gulp-plumber');          // https://github.com/floatdrop/gulp-plumber

// Glob options
// All libs in "app/libs"
let libsCss = []; // CSS libs
let libsJs = []; // JS libs
let toDeleteApp = ['app/**',
	'!app',
	'!app/index.pug',
	'!app/fonts/**',
	'!app/img/**',
	'!app/js',
	'!app/js/common.js',
	'!app/libs/**',
	'!app/pug/**',
	'!app/sass/**']; // To clear "app" folder
let toDeleteDest = ['dest']; // To clear "dest" folder
let toDeleteDestOnlyImg = ['dest/img'];
let toDeleteDestWithoutImg = toDeleteDestOnlyImg;
	for (var ind = 0; ind < toDeleteDestWithoutImg.length; ind++) {
		toDeleteDestWithoutImg[ind] = '!' + toDeleteDestWithoutImg[ind];
	}
	toDeleteDestWithoutImg = toDeleteDest.concat(toDeleteDestWithoutImg); // To clear "dest" folder without deleting images

/*-----------*/
/* Functions */
/*-----------*/

function pugCompilePart1() {
	return src(['app/pug/**/*.pug', '!app/pug/_dev.pug'])
		.pipe(plumber())
		.pipe(cache('pugCompiling'))
		.pipe(pug())
		.pipe(plumber.stop())
		.pipe(dest('app/pages'));
}

function pugCompilePart2() {
	return src('app/index.pug')
		.pipe(plumber())
		.pipe(cache('pugCompiling'))
		.pipe(pug())
		.pipe(plumber.stop())
		.pipe(dest('app'));
}

function sassCompile() {
	return src(['app/sass/**/*.sass', '!app/sass/_dev.sass'])
		.pipe(plumber())
		.pipe(cache('sassCompiling'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 10 versions']))
		.pipe(concat('style.min.css'))
		.pipe(cssnano())
		.pipe(plumber.stop())
		.pipe(dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
}

function concatCss(done) {
	if (libsCss.length > 0) {
		return src(libsCss)
			.pipe(plumber())
			.pipe(concat('libs.min.css'))
			.pipe(cssnano())
			.pipe(plumber.stop())
			.pipe(dest('app/css'))
			.pipe(browserSync.reload({stream: true}));
	} else {
		done();
	}
}

function concatJs(done) {
	if (libsJs.length > 0) {
		return src(libsJs)
			.pipe(plumber())
			.pipe(concat('libs.min.js'))
			.pipe(uglify())
			.pipe(plumber.stop())
			.pipe(dest('app/js'));
	} else {
		done();
	}
}

function createSprite() {
	log(chalk.cyan('Minifying SVG images in one file...'));
	del.sync('app/img/sprite.svg')
	return src('app/img/**/*.svg', {
			allowEmpty: true
		})
		.pipe(svgmin({
			plugins: [
				{removeStyleElement: true},
				{removeTitle: true},
				{removeDesc: true},
				{removeUselessDefs: true},
				{removeDimensions: true},
				{removeRasterImages: true},
				{collapseGroups: true},
				{cleanupNumericValues: {
						floatPrecision: 1
					}},
				{cleanupIDs: true},
				{removeEmptyContainers: true},
				{removeEmptyAttrs: true},
				{cleanupAttrs: true}
			]
		}))
		.pipe(rename({
			prefix: 'icon-'
		}))
		.pipe(svgstore())
		.pipe(rename({
			basename: 'sprite'
		}))
		.pipe(dest('app/img'));
}

function liveReload() {
	browserSync.init({
		server: {
			baseDir: 'app',
			index: "index.html"
		},
		notify: false
	})
}

/*-------------------------------------*/
/* Cleaner. Reloader. Watcher. Builder */
/*-------------------------------------*/

function clearCache(done) {
	cache.caches = {};
	done();
}

function clearApp(done) {
	del.sync(toDeleteApp);
	log(chalk.cyan('Clearing "app" folder...'));
	done();
}

function clearDest(done) {
	del.sync(toDeleteDest);
	log(chalk.cyan('Clearing "dest" folder...'));
	done();
}

function clearDestWithoutImg(done) {
	del.sync(toDeleteDestWithoutImg);
	log(chalk.cyan('Clearing "dest" folder without deleting images...'));
	done();
}

function clearDestOnlyImg(done) {
	del.sync(toDeleteDestOnlyImg);
	log(chalk.cyan('Clearing "dest" folder and only deleting images...'));
	done();
}

function watcher() {
	liveReload();
	watch('app/sass/**/*.sass', sassCompile);
	watch(['app/pug/**/*.pug', 'app/index.pug'], pugCompile);
	watch(['app/pages/**/*.html', 'app/index.html']).on('change', browserSync.reload);
	watch(['app/js/common.js', '!app/js/libs.min.js']).on('change', browserSync.reload);
}

function buildPart1() {
	log(chalk.cyan('Recompiling PUG...'));
	return src(['app/pug/**/*.pug', '!app/pug/_dev.pug'])
		.pipe(pug())
		.pipe(htmlmin())
		.pipe(dest('dest/pages'));
}

function buildPart2() {
	log(chalk.cyan('Recompiling index.pug...'));
	return src('app/index.pug')
		.pipe(pug())
		.pipe(htmlmin())
		.pipe(dest('dest'));
}

function buildPart3() {
	log(chalk.cyan('Recompiling SASS...'));
	return src(['app/sass/**/*.sass', '!app/sass/_dev.sass'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 10 versions']))
		.pipe(concat('style.min.css'))
		.pipe(uncss({
			html: ['dest/pages/**/*.html', 'dest/index.html']
		}))
		.pipe(cssnano())
		.pipe(dest('dest/css'));
}

function buildPart4() {
	log(chalk.cyan('Working with common.js...'));
	return src('app/js/common.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(strip())
		.pipe(dest('dest/js'));
}

function buildPart5(done) {
	log(chalk.cyan('Reconcatenating CSS libs...'));
	if (libsCss.length > 0) {
		src(libsCss)
			.pipe(concat('libs.min.css'))
			.pipe(uncss({
				html: ['dest/pages/**/*.html', 'dest/index.html']
			}))
			.pipe(cssnano())
			.pipe(dest('dest/css'))
	} else {
		done();
	}
}

function buildPart6(done) {
	log(chalk.cyan('Reconcatenating JS libs...'));
	if (libsJs.length > 0) {
		src(libsJs)
			.pipe(concat('libs.min.js'))
			.pipe(uglify())
			.pipe(dest('dest/js'));
	} else {
		done();
	}
}

function buildPart7() {
	log(chalk.cyan('Minifying images with .png, .gif, .jpg, .jpeg extensions...'));
	return src('app/img/**/*.{png,gif,jpg,jpeg}', { //svg may be?
			allowEmpty: true
		})
		.pipe(imagemin([
			pngquant({
				speed: 1,
				quality: [0.9, 1]
			}),
			zopfli({
				more: true,
				iterations: 5 //50 slow, but more effective
			}),
			imagemin.gifsicle({
				interlaced: true,
				optimizationLevel: 3
			}),
			/* giflossy({
				optimizationLevel: 3,
				optimize: 'keep-empty',
				lossy: 2
			}), */
			/* imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			}), */
			imagemin.jpegtran({
				progressive: true
			}),
			mozjpeg({
				quality: 90
			})
		], {
			verbose: true
		}))
		.pipe(dest('dest/img'));
}

function buildPart8() {
	log(chalk.cyan('Minifying SVG images in one sprite...'));
	return src('app/img/**/*.svg', {
			allowEmpty: true
		})
		.pipe(svgmin({
			plugins: [
				{removeStyleElement: true},
				{removeTitle: true},
				{removeDesc: true},
				{removeUselessDefs: true},
				{removeDimensions: true},
				{removeRasterImages: true},
				{collapseGroups: true},
				{cleanupNumericValues: {
						floatPrecision: 1
					}},
				{cleanupIDs: true},
				{removeEmptyContainers: true},
				{removeEmptyAttrs: true},
				{cleanupAttrs: true}
			]
		}))
		.pipe(rename({
			prefix: 'icon-'
		}))
		.pipe(svgstore())
		.pipe(rename({
			basename: 'sprite'
		}))
		.pipe(dest('dest/img'));
}

function buildPart9() {
	log(chalk.cyan('Copying other images...'));
	return src(['app/img/**/*.*', '!app/img/**/*.{png,gif,jpg,jpeg,svg}'], {
			allowEmpty: true
		})
		.pipe(dest('dest/img'));
}

function buildPart10() {
	log(chalk.cyan('Copying images...'));
	return src('app/img/**/*.*', {
			allowEmpty: true
		})
		.pipe(dest('dest/img'));
}


/*--------------------*/
/* Register functions */
/*--------------------*/

// Templates
let pugCompile = series(pugCompilePart1, pugCompilePart2);
let clearAll   = series(clearCache, clearApp, clearDest);
let build      = series(buildPart1, buildPart2, buildPart3, buildPart4, buildPart5, buildPart6);

exports.pugCompile   = pugCompile;   // Compile .pug files 
exports.sassCompile  = sassCompile;  // Compile .sass files, concatenate and minify
exports.concatCss    = concatCss;    // Concatenate css libs and minify
exports.concatJs     = concatJs;     // Concatenate js libs and minify
exports.createSprite = createSprite; // Create SVG sprite
exports.liveReload   = liveReload;   // Initializing browser synchronization

exports.clearCache          = clearCache;          // Clears the cache
exports.clearApp            = clearApp;            // Deleting unnecessary files and folders in "app" folder
exports.clearDest           = clearDest;           // Delete "dest" folder
exports.clearDestWithoutImg = clearDestWithoutImg; // In "dest" folder delete all without images ("img")
exports.clearDestOnlyImg    = clearDestOnlyImg;    // In "dest" folder delete only images ("img")
exports.clearAll            = clearAll;            // Deleting unnecessary files and folders in "app" folder. Delete "dest" folder. Clears the cache
exports.watcher             = watcher;             // Initializing watcher

exports.build               = series(clearDest, build, buildPart7, buildPart8, buildPart9); // Build project and compress images
exports.buildWithoutImg     = series(clearDestWithoutImg, buildб, buildPart10);             // Build project without compress images
exports.buildOnlyImg        = series(clearDestOnlyImg, buildPart7, buildPart8, buildPart9); // Only compress images

// As default development mode starts
exports.default = series(clearAll, sassCompile, pugCompile, concatCss, concatJs, createSprite, watcher);
