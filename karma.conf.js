module.exports = function(config) {
  config.set({
    files: [
      'nanofeed.js',
      './spec/test/*.js',
      './spec/*.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    preprocessors: { './nanofeed.js': ['coverage'] },
    coverageReporter: {
      type : 'lcov',
      dir : 'karma',
      subdir: 'report'
    }
  });
};
