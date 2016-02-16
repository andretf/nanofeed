'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    size = require('gulp-size');

var source = 'src/better-trello.js';
var dist = 'dist/better-trello.user.js';

gulp.task('lint', function () {
  return gulp.src(source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.results(function (results) {
        console.log('Total Files: ' + results.length);
        console.log('Total Warnings: ' + results.warningCount);
        console.log('Total Errors: ' + results.errorCount);
    }));
});

gulp.task('sass', function () {
  return gulp.src('./src/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglifycss())
    .pipe(size())
    .pipe(gulp.dest('./src/'));
});
gulp.task('sass:watch', function(){
  gulp.watch('./src/*.sass', ['sass']);
});

gulp.task('default', ['lint'], function () {
  return gulp.src(source)
    .pipe(rename(dist))
    .pipe(uglify({ preserveComments: 'all' }))
    .pipe(size())
    .pipe(gulp.dest('./'));
});
