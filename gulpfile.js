/*
 * 2mod
 * https://github.com/parroit/2mod
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var neat = require('node-neat');
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var $ = loadPlugins({
    lazy: true
});

var rootStyle = './assets/styles/style.scss';
var styles = './assets/styles/**/*.scss';
var srcs = ['./models/**/*.js', './routes/**/*.js', './app.js'];
var tests = './test/**/*.js';
var deployFolders = ['./views/**/*','./public/**/*'];
var distTests = './site_deploy/test/**/*.js';

gulp.task('style', function() {
    gulp.src(rootStyle)
        .pipe($.sass({
            includePaths: neat
                .with([
                    './assets/bitters/app/assets/stylesheets/',
                    './node_modules/font-awesome/scss',
                    './node_modules/colors.css/sass/'
                ])
        })).on('error', $.util.log.bind($.util))
        .pipe(gulp.dest('./public'));

});

gulp.task('watch-style', function() {
    return gulp.watch([styles], ['style']);
});
/*
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
*/

gulp.task('serve', function() {
    $.nodemon({
        script: 'bin/www.js',
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        }
    });
});


gulp.task('build', function() {
    return gulp.src(srcs.concat([tests]), {
            base: __dirname
        })
        .pipe($.traceur({
            blockBinding: true,
            annotations: true,
            typeAssertionModule: 'rtts-assert',
            typeAssertions: true,
            types: true,
        }))
        .pipe(gulp.dest('site_deploy'));
});

gulp.task('test', ['build'], function() {
    return gulp.src(distTests)
        .pipe($.mocha({}));
});

gulp.task('deploy', ['build','style','fonts'], function() {
    return gulp.src(deployFolders, {
            base: __dirname
        })
        .pipe(gulp.dest('site_deploy'));
});


gulp.task('fonts',  function() {
    return gulp.src('./node_modules/font-awesome/fonts/*', {
            base: __dirname +'/node_modules/font-awesome'
        })
        .pipe(gulp.dest('site_deploy/public'));
});


gulp.task('watch', function() {
    gulp.watch(srcs.concat([tests]), ['test']);
});

gulp.task('default', ['test', 'watch']);
