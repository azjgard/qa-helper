var gulp = require('gulp');

//
// Gulp Modules
//

// run command line stuff
var shell = require('gulp-shell');

// combine files together
var concat = require('gulp-concat');

// listen for file changes to run tasks
var watch = require('gulp-watch');

// run gulp tasks synchronously
var runSequence = require('run-sequence');

// pipe here first to prevent stoppage on err
var plumber = require('gulp-plumber');

// prepend and append text to files
var wrapper = require('gulp-wrapper');

// change file extensions
var ext_replace = require('gulp-ext-replace');

// make code ugly
var uglify      = require('gulp-uglify');
var uglifycss   = require('gulp-uglifycss');

// escape javascript strings
var jsesc = require('jsesc');

// filesystem
var fs = require('fs')

//
// Variables
//

var cssHeader = '(function() { var css = \'';
var cssFooter = '\';'                                         +
             'var style = document.createElement(\'style\');' +
             'style.innerHTML = css;'                         +
             'document.head.appendChild(style);'              +
             '})();'

//
// Tasks
//

//
// styles
//
// descr - Grabs css files, combines them together,
// uglifies the resulting file, changes the file extension to .js,
// wraps the file with some code to make it valid JavaScript, and
// outputs it into the js folder
gulp.task('styles', function() {
  // grab the css files
  gulp.src('./css/**/*.css')

    // prevent errors from breaking workflow 
    .pipe(plumber())

    // combine them
    .pipe(concat('styles.css'))

    // uglify
    .pipe(uglifycss({
      uglyComments: true
    }))

    // convert to js
    .pipe(ext_replace('.js'))

    // wrap in js code
    .pipe(wrapper({
      header: cssHeader,
      footer: cssFooter
    }))

    // spit into js directory
    .pipe(gulp.dest('./js/'));
});

//
// scripts
//
// descr - concatenates and uglifies all JavaScript
// files from the js folder and spits them out
// as one file in the output folder, called 'obfuscated.js'
//
// (this replaced two tasks formerly named 
// 'concat-scripts' and 'uglify-scripts')
//
gulp.task('scripts', function() {
  // grab all js files
  return gulp.src('./js/**/*.js')

    // prevent errors from breaking workflow 
    .pipe(plumber())

    // combine into one file
    .pipe(concat('obfuscated.js'))

    // uglify
    .pipe(uglify({
      compress : false,
      mangle   : false
    }))

    // put in output folder
    .pipe(gulp.dest('./output'));
})

gulp.task('scripts-clean', function() {
  // grab all js files
  return gulp.src('./js/**/*.js')

    // prevent errors from breaking workflow 
    .pipe(plumber())

    // combine into one file
    .pipe(concat('unobfuscated.js'))

    // put in output folder
    .pipe(gulp.dest('./output'));
})

gulp.task('dist', function() {
  fs.readFile('./output/obfuscated.js', 'utf-8', function read(err, data) {
    if (err) { throw err; }
    else {
      var escaped = jsesc(data, { 'quotes' : 'double' });
      escaped = "javascript:(function(){" + escaped + "})()";

      fs.writeFile('./dist/obfuscated.js', escaped, function(err) {
        if (err) { throw err; }
      })
    }
  }); 
});

//
// sequence
//
// descr - used to run tasks that depend on one another,
// since by default, gulp runs all tasks asynchronously
//
// - styles is a dependency of scripts, since the CSS
// files need to be converted to JavaScript before
// all of the JavaScript files are handled
gulp.task('sequence', function(done) {
  runSequence('styles', 'scripts', 'scripts-clean', 'dist', function() {
    done(); // required callback
  })
});


gulp.task('default', function(done) {
  gulp.watch(['js/**/*.js', 'css/**/*.css'], ['sequence']);
});

