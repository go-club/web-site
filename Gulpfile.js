/*
 * 2mod
 * https://github.com/parroit/2mod
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var less = require('gulp-less');

gulp.task('style', function () {
  gulp.src('./assets/stylesheets/style.less')
    .pipe(less())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('test', function () {
  return gulp.src('./test/*.js')
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'spec'
    }));
});

gulp.task('watch', function () {
  gulp.watch(['./lib/**/*.js', './test/**/*.js'], ['test']);
});

gulp.task('default', ['test', 'watch']);
