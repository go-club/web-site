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

gulp.task('style', function() {
    gulp.src('./assets/css/style.less')
        .pipe($.less()).on('error',$.util.log.bind($.util))
        .pipe(gulp.dest('./public'));

     gulp.src([
        'node_modules/vex/css/vex.css',
        'node_modules/vex/css/vex-theme-os.css',
        
    ])
        .pipe($.concat('vendors.css'))
        .pipe(gulp.dest('public'));
});

gulp.task('oldies', function() {
    //concat files for ie<9
});

gulp.task('build-admins', function() {

    return gulp.src('./assets/js/admin/index.js')
        .pipe($.pureCjs({
            output: 'admin.js'
        })).on('error',$.util.log)
        .pipe(gulp.dest('public'));
});


gulp.task('build-vendors', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'assets/js/gaq.js',
    ])
        .pipe($.concat('vendors.js'))
        .pipe(gulp.dest('public'));
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



gulp.task('default', ['test', 'watch']);
