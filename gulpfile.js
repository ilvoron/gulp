"use strict";

/*-----------*/
/* Constants */
/*-----------*/

// Basic constants
const { src, dest, series, watch } = require("gulp"); // This is Gulp

const fs   = require("fs");         // This is Node.js
const argv = require('yargs').argv; // This is Node.js

// Compilation
const pug  = require("gulp-pug");  // https://github.com/gulp-community/gulp-pug
const sass = require("gulp-sass"); // https://github.com/dlmanning/gulp-sass

// Transpilation
const babel = require("gulp-babel"); // https://github.com/babel/gulp-babel

// Concatenation
const concat = require("gulp-concat"); // https://github.com/wearefractal/gulp-concat

// Minification
const cssnano  = require("gulp-cssnano");        // https://github.com/ben-eb/gulp-cssnano
const htmlmin  = require("gulp-htmlmin");        // https://github.com/jonschlinkert/gulp-htmlmin
const uglify   = require("gulp-uglify");         // https://github.com/terinjokes/gulp-uglify
const imagemin = require("gulp-imagemin");       // https://github.com/sindresorhus/gulp-imagemin
const pngquant = require("imagemin-pngquant");   // https://github.com/imagemin/imagemin-pngquant
const mozjpeg  = require("imagemin-mozjpeg");    // https://github.com/imagemin/imagemin-mozjpeg
const zopfli   = require("imagemin-zopfli");     // https://github.com/imagemin/imagemin-zopfli
const svgmin   = require("gulp-svgmin");         // https://github.com/ben-eb/gulp-svgmin
const cheerio  = require("gulp-cheerio");        // https://github.com/knpwrs/gulp-cheerio
const strip    = require("gulp-strip-comments"); // https://github.com/RnbWd/gulp-strip-comments

// Optimization
const svgstore = require("gulp-svgstore"); // https://github.com/w0rm/gulp-svgstore

// Logging
const log   = require("fancy-log"); // https://github.com/gulpjs/fancy-log
const chalk = require("chalk");     // https://github.com/chalk/chalk

// Miscellaneous
const browserSync  = require("browser-sync").create(); // https://browsersync.io
const autoprefixer = require("gulp-autoprefixer");     // https://github.com/sindresorhus/gulp-autoprefixer
const rename       = require("gulp-rename");           // https://github.com/hparra/gulp-rename
const del          = require("del");                   // https://github.com/sindresorhus/del
const plumber      = require("gulp-plumber");          // https://github.com/floatdrop/gulp-plumber
const posthtml     = require("gulp-posthtml");         // https://github.com/posthtml/gulp-posthtml
const posthtmlBem  = require("posthtml-bem");          // https://github.com/rajdee/posthtml-bem

/*----------------*/
/* Global options */
/*----------------*/

// Paths to exceptions
let exceptionsArr = [];

let indexFile = "index.html" // Main file
let baseDir = "app";         // Base directory
let destDir = "dest";        // Destination directory (when "build")
let cssSubDir = "css";       // Directory for .css files
let jsSubDir = "js";         // Directory for .js files
let imgSubDir = "img";       // Directory for images
let fontsSubDir = "fonts";   // Directory for fonts
let sassSubDir = "sass";     // Where all .sass, .scss files are located

// All libs in "app/libs". Use "bower install <package name>"
let libsCss = []; // CSS libs. Example ["app/libs/bootstrap/dist/css/bootstrap.min.css"]
let libsJs = [];  // JS libs. Example ["app/libs/jquery/dist/jquery.min.js"]

let toDeleteApp = [baseDir + "/" + cssSubDir,
	baseDir + "/**/*.{html,htm}",
	"!" + baseDir + "/" + fontsSubDir,
	"!" + baseDir + "/" + imgSubDir,
	"!" + baseDir + "/" + jsSubDir,
	"!" + baseDir + "/libs",
	"!" + baseDir + "/" + sassSubDir];                 // To clear "app" folder
let toDeleteDest = [destDir];                          // To clear "dest" folder
let toDeleteDestOnlyImg = [destDir + "/" + imgSubDir]; // To clear "dest" folder and only  deleting images
let toDeleteDestWithoutImg = toDeleteDestOnlyImg;      // To clear "dest" folder without deleting images
	for (var ind = 0; ind < toDeleteDestWithoutImg.length; ind++) {
		toDeleteDestWithoutImg[ind] = "!" + toDeleteDestWithoutImg[ind];
	}
	toDeleteDestWithoutImg = toDeleteDest.concat(toDeleteDestWithoutImg);

let pugFiles = [baseDir + "/**/[^_]*.{pug,jade}"];                      // Pug files for compile
let sassFiles = [baseDir + "/" + sassSubDir + "/**/[^_]*.{sass,scss}"]; // Sass files for compile
let imgFiles = ["png", "gif", "jpg", "jpeg"];                           // Images formats those can be compressed

/*---------------*/
/* Preprocessing */
/*---------------*/

const spaceCode = "&nbsp;";

function convertToSpaces(str) {
	try {
		while (str.indexOf(spaceCode) >= 0) {
			str = str.replace(spaceCode, " ");
		}
	} catch(err) {}
	return str;
}

function deleteApos(str) {
	try {
		while (str.indexOf("\"") >= 0) {
			str = str.replace("\"", "");
		}
		while (str.indexOf("'") >= 0) {
			str = str.replace("'", "");
		}
	} catch(err) {}
	return str;
}

try {
	if (fs.existsSync("preferences.json")) {
		let rawData = fs.readFileSync("preferences.json");
		let data = JSON.parse(rawData);
		let excArr = data.exceptions;
		for (var ind = 0; ind < excArr.length; ind++) {
			exceptionsArr.push(baseDir + "/" + String(excArr[ind]));
		}
	}
} catch(err) {}

try {
	if (argv.customDest != undefined) {
		destDir = deleteApos(convertToSpaces(String(argv.customDest)));
	}
} catch(err) {}

pugFiles = pugFiles.concat(exceptionsArr);
sassFiles = sassFiles.concat(exceptionsArr);

/*-----------*/
/* Functions */
/*-----------*/

function pugCompile() {
	return src(pugFiles)
		.pipe(plumber())
		.pipe(pug({
			basedir: baseDir
		}))
		.pipe(posthtml([
            posthtmlBem({
                elemPrefix: "__",
                modPrefix: "_",
                modDlmtr: "-"
            })
        ]))
		.pipe(plumber.stop())
		.pipe(dest(baseDir));
}

function sassCompile() {
	return src(sassFiles)
		.pipe(plumber())
		.pipe(sass().on("error", sass.logError))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer(["last 10 versions"]))
		.pipe(cssnano())
		.pipe(plumber.stop())
		.pipe(dest(baseDir + "/" + cssSubDir))
		.pipe(browserSync.reload({stream: true}));
}

function concatCss(done) {
	if (libsCss.length > 0) {
		return src(libsCss)
			.pipe(plumber())
			.pipe(concat("libs.min.css"))
			.pipe(cssnano())
			.pipe(plumber.stop())
			.pipe(dest(baseDir + "/" + cssSubDir))
			.pipe(browserSync.reload({stream: true}));
	} else {
		done();
	}
}

function concatJs(done) {
	if (libsJs.length > 0) {
		return src(libsJs)
			.pipe(plumber())
			.pipe(concat("libs.min.js"))
			.pipe(uglify())
			.pipe(plumber.stop())
			.pipe(dest(baseDir + "/" + jsSubDir));
	} else {
		done();
	}
}

function createSprite() {
	log(chalk.cyan("Minifying SVG images in one file..."));
	let imgFolder = baseDir + "/" + imgSubDir;
	del.sync(imgFolder + "/sprite.svg")
	return src([imgFolder + "/**/*.svg"].concat(exceptionsArr), {
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
			prefix: "icon-"
		}))
		.pipe(svgstore())
		.pipe(cheerio({
			run: function ($) {
				$("svg").attr("style",  "display:none");
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(rename({
			basename: "sprite"
		}))
		.pipe(dest(imgFolder));
}

function liveReload() {
	browserSync.init({
		server: {
			baseDir: baseDir,
			index: indexFile
		},
		notify: false
	})
}

/*-------------------------------------*/
/* Cleaner. Reloader. Watcher. Builder */
/*-------------------------------------*/

function clearApp(done) {
	del.sync(toDeleteApp);
	log(chalk.cyan("Clearing 'app' folder..."));
	done();
}

function clearDest(done) {
	del.sync(toDeleteDest);
	log(chalk.cyan("Clearing 'dest' folder..."));
	done();
}

function clearDestWithoutImg(done) {
	del.sync(toDeleteDestWithoutImg);
	log(chalk.cyan("Clearing 'dest' folder without deleting images..."));
	done();
}

function clearDestOnlyImg(done) {
	del.sync(toDeleteDestOnlyImg);
	log(chalk.cyan("Clearing 'dest' folder and only deleting images..."));
	done();
}

function watcher() {
	liveReload();
	watch([baseDir + "/" + sassSubDir + "/**/*.{sass,scss}"].concat(exceptionsArr), sassCompile);
	watch([baseDir + "/**/*.{pug,jade}"].concat(exceptionsArr), pugCompile);
	watch([baseDir + "/**/*.{html,htm}"].concat(exceptionsArr)).on("change", browserSync.reload);
	watch([baseDir + "/" + jsSubDir + "/**/*.js"].concat(exceptionsArr)).on("change", browserSync.reload);
}

function buildPartCompilePug() {
	log(chalk.cyan("Recompiling PUG..."));
	return src(pugFiles)
		.pipe(plumber())
		.pipe(pug({
			basedir: baseDir
		}))
		.pipe(posthtml([
            posthtmlBem({
                elemPrefix: "__",
                modPrefix: "_",
                modDlmtr: "-"
            })
		]))
		.pipe(htmlmin())
		.pipe(strip())
		.pipe(plumber.stop())
		.pipe(dest(destDir));
}

function buildPartCompileSass() {
	log(chalk.cyan("Recompiling SASS..."));
	return src(sassFiles)
		.pipe(sass().on("error", sass.logError))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer(["last 10 versions"]))
		.pipe(cssnano())
		.pipe(dest(destDir + "/" + cssSubDir));
}

function buildPartJs() {
	log(chalk.cyan("Working with .js files..."));
	return src([baseDir + "/" + jsSubDir + "/**/*.js"].concat(exceptionsArr))
		.pipe(babel({
			presets: ["@babel/preset-env"]
		}))
		.pipe(strip())
		.pipe(dest(destDir + "/" + jsSubDir));
}

function buildPartConcatCss(done) {
	log(chalk.cyan("Reconcatenating CSS libs..."));
	if (libsCss.length > 0) {
		return src(libsCss)
			.pipe(concat("libs.min.css"))
			.pipe(cssnano())
			.pipe(dest(destDir + "/" + cssSubDir))
	} else {
		done();
	}
}

function buildPartConcatJs(done) {
	log(chalk.cyan("Reconcatenating JS libs..."));
	if (libsJs.length > 0) {
		return src(libsJs)
			.pipe(concat("libs.min.js"))
			.pipe(uglify())
			.pipe(dest(destDir + "/" + jsSubDir));
	} else {
		done();
	}
}

function buildPartMinifyBaseImages() {
	let tmpArr = imgFiles;
	for (var ind = 0; ind < tmpArr.length; ind++) {
		tmpArr[ind] = "." + tmpArr[ind];
	}
	log(chalk.cyan("Minifying images with " + tmpArr.join(", ") + " extensions..."));
	return src([baseDir + "/" + imgSubDir + "/**/*.{" + imgFiles.join(",") + "}"].concat(exceptionsArr), { //svg may be?
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
				optimize: "keep-empty",
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
		.pipe(dest(destDir + "/" + imgSubDir));
}

function buildPartMinifySVG() {
	log(chalk.cyan("Minifying SVG images in one sprite..."));
	return src([baseDir + "/" + imgSubDir + "/**/*.svg"].concat(exceptionsArr), {
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
			prefix: "icon-"
		}))
		.pipe(svgstore())
		.pipe(cheerio({
			run: function ($) {
				$("svg").attr("style",  "display:none");
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(rename({
			basename: "sprite"
		}))
		.pipe(dest(destDir + "/" + imgSubDir));
}

function buildPartCopyOtherImages() {
	log(chalk.cyan("Copying other images..."));
	return src([baseDir + "/" + imgSubDir + "/**/*.*", "!" + baseDir + "/" + imgSubDir + "/**/*.{" + imgFiles.concat(["svg"]).join(",") + "}"].concat(exceptionsArr), {
			allowEmpty: true
		})
		.pipe(dest(destDir + "/" + imgSubDir));
}

function buildPartCopyAllImages() {
	log(chalk.cyan("Copying images..."));
	return src([baseDir + "/" + imgSubDir + "/**/*.*"].concat(exceptionsArr), {
			allowEmpty: true
		})
		.pipe(dest(destDir + "/" + imgSubDir));
}

function buildPartCopyFonts() {
	log(chalk.cyan("Copying fonts..."));
	return src([baseDir + "/" + fontsSubDir + "/**/*.*"].concat(exceptionsArr), {
		allowEmpty: true
	})
	.pipe(dest(destDir + "/" + fontsSubDir));
}

/*--------------------*/
/* Register functions */
/*--------------------*/

// Templates
let clearAll           = series(clearApp, clearDest);
let build              = series(buildPartCompilePug, buildPartCompileSass, buildPartJs, buildPartConcatCss, buildPartConcatJs, buildPartCopyFonts);
let buildPartMinifyImg = series(buildPartMinifyBaseImages, buildPartMinifySVG, buildPartCopyOtherImages)

exports.pugCompile   = pugCompile;   // Compile .pug files 
exports.sassCompile  = sassCompile;  // Compile .sass files, concatenate and minify
exports.concatCss    = concatCss;    // Concatenate css libs and minify
exports.concatJs     = concatJs;     // Concatenate js libs and minify
exports.createSprite = createSprite; // Create SVG sprite
exports.liveReload   = liveReload;   // Initializing browser synchronization

exports.clearApp            = clearApp;            // Deleting unnecessary files and folders in "app" folder
exports.clearDest           = clearDest;           // Delete "dest" folder
exports.clearDestWithoutImg = clearDestWithoutImg; // In "dest" folder delete all without images ("img")
exports.clearDestOnlyImg    = clearDestOnlyImg;    // In "dest" folder delete only images ("img")
exports.clearAll            = clearAll;            // Deleting unnecessary files and folders in "app" folder. Delete "dest" folder. Clears the cache
exports.watcher             = watcher;             // Initializing watcher

exports.build           = series(clearDest, build, buildPartMinifyImg);               // Build project and compress images
exports.buildWithoutImg = series(clearDestWithoutImg, build, buildPartCopyAllImages); // Build project without compress images
exports.buildOnlyImg    = series(clearDestOnlyImg, buildPartMinifyImg);               // Only compress images

// As default development mode starts
exports.default = series(clearAll, sassCompile, pugCompile, concatCss, concatJs, createSprite, watcher);
