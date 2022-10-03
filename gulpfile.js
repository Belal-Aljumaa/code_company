const gulp = require('gulp');  // to import gulp from gulp modules
const concat = require('gulp-concat');  // to concat files
const autoprefixer = require('gulp-autoprefixer');  // to add css prefixes
const sass = require('gulp-sass')(require('sass'));  // to manipulate sass file
const pug = require('gulp-pug');  // for html pug
const livereload = require('gulp-livereload');  // for livereload
const sourcemaps = require('gulp-sourcemaps');  // to create a map
const uglify = require('gulp-uglify');  // to minify js scripts
const notify = require('gulp-notify');  // to show notifications
const zip = require('gulp-zip');  // to compress files


// Html Task
gulp.task('html', function () {
  return gulp
    .src("src/assets/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist/html"))
    .pipe(notify("HTML Task Is Done"))
    .pipe(livereload());
});

// Css Task
gulp.task('css', function () {
  return (
    gulp
      .src("src/assets/css/main.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer("last 2 versions"))
      .pipe(concat("main.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
      .pipe(notify("CSS Task Is Done"))
      .pipe(livereload())
  );
});

// Js Task
gulp.task('js', function () {
  return gulp
    .src("src/assets/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("Javascript Task Is Done"))
    .pipe(livereload());
});

// Compress Files
gulp.task('compress', function () {
  return gulp
    .src('dist/**/*.*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('.'))
    .pipe(notify('Files Compressed'));
});

// Watch Task
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch("src/assets/index.pug", gulp.series("html"));
  gulp.watch("src/assets/css/**/*.scss", gulp.series("css"));
  gulp.watch('src/assets/js/*.js', gulp.series('js'));
  gulp.watch('dist/**/*.*', gulp.series('compress'));
});

// Default Task
gulp.task('default', gulp.series('watch'));
