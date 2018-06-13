'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  size = require('gulp-size'),
  jasmine = require('gulp-jasmine-phantom');

gulp.task('clean', function () {
  return del('dist/**/*.js')
})

gulp.task('test', ['build'], function () {
  return gulp
    .src('spec/*.js')
    .pipe(jasmine({
      integration: true,
      specHtml: './spec/specRunner.html'
    }));
});

gulp.task('build', ['clean'], function () {
  return gulp
    .src('src/**/*')
    .pipe(concat('nanofeed.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('nanofeed.min.js'))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(size())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);
