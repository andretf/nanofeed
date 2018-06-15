module.exports = function (config) {
  config.set({
    files: [
      './dist/nanofeed.min.js',
      './spec/helpers/*.js',
      './spec/*.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-opera-launcher',
      'karma-ie-launcher',
      'karma-safari-launcher'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      './src/nanofeed.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'karma',
      subdir: 'report'
    }
  });
};
