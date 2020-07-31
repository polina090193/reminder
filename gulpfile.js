'use strict';

const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
const ghPages = require('gh-pages');
sass.compiler = require('node-sass');

const scssFiles = [
  './src/scss/style.scss',
  './src/scss/reset.scss',
]

const jsFiles = [
  './src/js/index.js',
]

gulp.task('html', function() {
  return gulp.src('./src/*.html')
  .pipe(gulp.dest('./build'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function () {
  return gulp.src(scssFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(concat('style.scss'))
  .pipe(sass({outputStyle: 'compressed'}))  

  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

gulp.task('scripts', 
function () {
  return gulp.src(jsFiles)

  .pipe(concat('index.js'))

  .pipe(gulp.dest('./build/js'))
  .pipe(browserSync.stream());
});

gulp.task('images', 
function () {
  return gulp.src('./src/images/*')
      .pipe(gulp.dest('./build/images'));
});

gulp.task('audio', 
function () {
  return gulp.src('./src/audio/*')
      .pipe(gulp.dest('./build/audio'));
});

gulp.task('del', 
function () {
  return del(['build/*'])
});

gulp.task('watch',
function () {
  browserSync.init({
    server: "build"
  });
  gulp.watch("./src/*.html", gulp.series('html'));
  gulp.watch('./src/scss/*.scss', gulp.series('styles'));
  gulp.watch('./src/js/*.js',  gulp.series('scripts'));
});
  
gulp.task('build', gulp.series('del', 'html', 'images', 'audio', 'styles', 'scripts'));
gulp.task('dev', gulp.series('build', 'watch'));

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './build'), cb);
}
exports.deploy = deploy;