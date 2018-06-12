'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  size = require('gulp-size'),
  jasmine = require('gulp-jasmine-phantom');

var source = './src/nanofeed.js';
var dest = 'nanofeed.min.js';

gulp.task('test', function () {
  return gulp.src('spec/*.js')
    .pipe(jasmine({
      integration: true,
      specHtml: './spec/specRunner.html'
    }));
});

gulp.task('build', ['test'], function () {
  return gulp.src(source)
    .pipe(gulp.dest('./dist'))
    .pipe(rename(dest))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);
