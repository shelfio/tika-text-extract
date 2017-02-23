module.exports = wallaby => {
  return {
    testFramework: 'jest',
    files: [
      'package.json',
      'index.js',
      'src/**/*.js',
      '!src/**/*.test.js'
    ],
    tests: [
      'index.test.js',
      'src/**/*.test.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      'src/**/*.js': wallaby.compilers.babel()
    },
    setup(wallaby) {
      wallaby.testFramework.configure(require('./package.json').jest);
    }
  };
};
