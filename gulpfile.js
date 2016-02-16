'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    size = require('gulp-size');

var source = 'nano-feed.js';
var dest = 'nano-feed.min.js';

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

gulp.task('default', ['lint'], function () {
  return gulp.src(source)
    .pipe(rename(dest))
    .pipe(uglify({ preserveComments: 'all' }))
    .pipe(size())
    .pipe(gulp.dest('./'));
});
