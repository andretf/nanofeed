'use strict';

var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
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

gulp.task('build', ['test', 'lint'], function () {
  return gulp.src(source)
    .pipe(gulp.dest('./dist'))
    .pipe(rename(dest))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);
