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
var pngcrush = require('imagemin-pngcrush');

var rootStyle = './assets/styles/style.scss';
var styles = './assets/styles/**/*.scss';
var srcs = ['./models/**/*.js', './routes/**/*.js', './views/**/*.js', './app.js'];
var tests = './test/**/*.js';
var clientJs = './assets/js/app.js';

gulp.task('js', function() {

    return gulp.src(clientJs)
        .pipe($.sourcemaps.init())
        .pipe($.pureCjs({
            output: 'go-club.js',
            exports: 'goClub'
        }).on('error', $.util.log.bind($.util)))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('public'));
});


gulp.task('watch-js', function() {
    return gulp.watch(srcs.concat([clientJs]), ['js']);
});

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



gulp.task('serve', function() {

    return $.nodemon({
        nodeArgs: ['--harmony'],
        watch: ['.'],
        script: 'bin/www.js',
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        }
    });
});



gulp.task('test', ['build'], function() {
    return gulp.src(tests)
        .pipe($.mocha({}));
});



gulp.task('img', function () {
    return gulp.src('./assets/img/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }).on('error', $.util.log.bind($.util)))
        .pipe(gulp.dest('./public/img'));
});

gulp.task('fonts', function() {
    return gulp.src('./node_modules/font-awesome/fonts/*', {
            base: __dirname + '/node_modules/font-awesome'
        })
        .pipe(gulp.dest('public'));
});


gulp.task('watch', function() {
    gulp.watch(srcs.concat([tests]), ['test']);
});

gulp.task('default', ['test', 'watch']);
