module.exports = function (config) {
  config.set({
    files: [
      './src/nanofeed.js',
      './spec/helpers/*.js',
      './spec/*.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    browsers: ['jsdom'],
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-jsdom-launcher',
      'karma-mocha-reporter'
    ],
    reporters: ['coverage', 'progress'],
    preprocessors: {
      './src/nanofeed.js': ['coverage']
    },
    coverageReporter: {
      reporters: [{
        type: 'lcovonly'
      }, {
        type: 'text-summary'
      }, {
        type: 'html'
      }],
      dir: './coverage',
      subdir: './'
    }
  })
}
