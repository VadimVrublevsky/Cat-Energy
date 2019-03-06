'use strict';
          // Импорт плагинов
var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch");
var prefixer = require("gulp-autoprefixer");
// var uglify = require("gulp-uglify");
// var sourcemaps = require("gulp-sourcemaps");
// var rigger = require("gulp-rigger");
// var cssmin = require("gulp-clean-css");
// var imagemin = require("gulp-imagemin");
// var pngquant = require("imagemin-pngquant");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var path = {
  build: { // Местонахождение готовых файлов (после сборки)
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  source: { // Местонахождение исходных файлов
    html: 'source/*.html',
    js: 'source/js/main.js',
    sass: 'source/sass/style.scss',
    css: 'source/css/',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },
  watch: { // Файлы, за изменениями которых мы будем наблюдать
    html: 'source/**/*.html',
    js: 'source/js/**/*.js',
    sass: 'source/sass/**/*.scss',
    css: 'source/css/style/**/*.css',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },
  clean: './build'
};

gulp.task('style:build', function() {
  return gulp.src(path.source.sass)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(gulp.dest(path.source.css))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch([path.watch.sass], gulp.series('style:build'));
});

