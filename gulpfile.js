'use strict';
          // Импорт плагинов
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var watch = require("gulp-watch");
var server = require("browser-sync").create();

var path = {
  source: { // Местонахождение исходных файлов
    html: 'source/*.html',
    js: 'source/js/*.js',
    sass: 'source/sass/style.scss',
    css: 'source/css/',
    img: 'source/img/**/*.{png,jpg,svg,webp}',
    imgR: 'source/img/**/*.{png,jpg}',
    imgVS: 'source/img/vector/*-icon.svg',
    fonts: 'source/fonts/**/*.ttf'
  },
  watch: { // Файлы, за изменениями которых мы будем наблюдать
    html: 'source/*.html',
    js: 'source/js/**/*.js',
    sass: 'source/sass/**/*.scss',
    css: 'source/css/style/**/*.css',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },
};

gulp.task("style", function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
  ];
  return gulp.src(path.source.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});
gulp.task("sprite", function() {
  return gulp.src(path.source.imgVS)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});
gulp.task("html", function() {
  return gulp.src(path.source.html)
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});
gulp.task("images", function() {
  return gulp.src(path.source.img)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(path.source.img));
});
gulp.task("webp", function() {
  return gulp.src(path.source.imgR)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(path.source.img));
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });
  gulp.watch([path.watch.sass], gulp.parallel("style"));
  gulp.watch([path.watch.html], gulp.parallel("html"))
  .on("change", server.reload);
});

gulp.task("copy", function() {
  return gulp.src([
    path.source.fonts,
    path.source.img,
    path.source.js
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});
gulp.task("clean", function() {
  return del("build");
});
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "style",
  "sprite",
  "html",
  )
);
