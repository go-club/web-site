/*
 * 2mod
 * https://github.com/parroit/2mod
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var $ = loadPlugins({
    lazy: true
});

gulp.task('style', function () {
  gulp.src('./assets/css/style.less')
    .pipe($.less())
    .pipe(gulp.dest('./public'));
});

gulp.task('serve', function() {
    $.nodemon({
        script: 'bin/www.js',
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        }
    });
});


/*
gulp.task('test', function () {
  return gulp.src('./test/*.js')
    .pipe($.mocha({
      ui: 'bdd',
      reporter: 'spec'
    }));
});
*/
/*
gulp.task('watch', function () {
  gulp.watch([], ['test']);
});
*/

gulp.task('default', ['test', 'watch']);
