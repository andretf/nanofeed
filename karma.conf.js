module.exports = function (config) {
  config.set({
    files: [
      './src/nanofeed.js',
      './spec/helpers/*.js',
      './spec/*.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    browsers: ['PhantomJS'],
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
