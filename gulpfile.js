var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var runSequence = require('run-sequence');
var plumber     = require('gulp-plumber'); // prevents stoppage on err
 
gulp.task('concat-scripts', function() {
    return gulp.src('./js/*.js')
      .pipe(plumber())
      .pipe(concat('obfuscated.js'))
      .pipe(gulp.dest('./output/'));
});

gulp.task('uglify-scripts', function() {
  return gulp.src('./output/obfuscated.js')
    .pipe(plumber())
    .pipe(uglify({
      compress : true,
      mangle   : true
    }))
    .pipe(gulp.dest('./output'));
});

gulp.task('sequence', function(done) {
  runSequence('concat-scripts', 'uglify-scripts', function() {
    done();
  })
});

gulp.task('default', function(done) {
  gulp.watch('js/*.js', ['sequence']);
});
