var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'test/**/*.spec.js',
      // 'src/dev/**/*.js',
      // 'src/dev/**/*.vue'
    ],
    /**
     * 我们用到了babel-plugin-istanbul
     * 它要求不要再这里加coverage，因为它已经集成了，
     * 如果再添加corverage，会修改原来的打桩，
     * 导致打桩代码无法找到原来的对象
     * https://github.com/istanbuljs/babel-plugin-istanbul
     */
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap'],
      'src/dev/**/*.js':['webpack', 'sourcemap',],
      'src/dev/**/*.vue':['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    browsers: ['Chrome'],
    singleRun:true
  })
}
