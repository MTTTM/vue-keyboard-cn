var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'test/**/*.spec.js',
      'src/dev/**/*.js'
    ],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap'],
      'src/dev/**/*.js':['webpack', 'sourcemap','coverage'],
    },
    webpack: webpackConfig,

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    browsers: ['Chrome'],
  })
}
