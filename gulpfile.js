var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var pug = require('gulp-pug');
var connect = require('gulp-connect');

gulp.task('connect', function(cb){
  connect.server({
    root: 'public',
    livereload: true
  });
  return cb();
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(gulp.dest('./public'));
});

gulp.task('sass-lint', function () {
  return gulp.src('./scss/**/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
});

gulp.task('pug', () => {
  return gulp.src('./pug/index.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('livereload', function (){
  return gulp.src('./public/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass-lint', 'sass','livereload'));
  gulp.watch('./pug/index.pug', gulp.series('pug','livereload'));
});

gulp.task('default', gulp.parallel('connect', 'watch'), function(){
  return;
});