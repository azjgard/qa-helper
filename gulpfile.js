var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var runSequence = require('run-sequence');
var plumber     = require('gulp-plumber'); // prevents stoppage on err

// css to js
var wrapper     = require('gulp-wrapper');
var ext_replace = require('gulp-ext-replace');
var uglifycss   = require('gulp-uglifycss');

var cssHeader = '(function() { var css = \'';
var cssFooter = '\';'                                         +
             'var style = document.createElement(\'style\');' +
             'style.innerHTML = css;'                         +
             'document.head.appendChild(style);'              +
             '})();'

// convert the css file to js
gulp.task('css-to-js', function() {
  gulp.src('./css/stylesheet.css')

    // uglify
    .pipe(uglifycss({
      uglyComments: true
    }))

    // convert to js file
    .pipe(ext_replace('.js'))

    // wrap in js code
    .pipe(wrapper({
      header: cssHeader,
      footer: cssFooter
    }))

    // spit into js directory
    .pipe(gulp.dest('./js/'));
});
 
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
  runSequence('css-to-js', 'concat-scripts', 'uglify-scripts', function() {
    done();
  })
});

gulp.task('default', function(done) {
  gulp.watch(['js/*.js', 'css/*.css'], ['sequence']);
});
