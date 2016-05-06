var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
});

gulp.task('csso', function () {
  return gulp.src('./public/css/style.css')
    .pipe(csso())
    .pipe(gulp.dest('./public/css/'));
});
