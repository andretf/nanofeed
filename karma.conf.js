module.exports = function(config) {
  config.set({
    files: [
      './nano-feed.js',
      './spec/test/*.js',
      './spec/*.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    preprocessors: { './nano-feed.js': ['coverage'] },
    coverageReporter: {
      type : 'lcov',
      dir : 'karma',
      subdir: 'report'
    }
  });
};
