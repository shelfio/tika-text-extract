const testFile = require('fs').readFileSync('./Readme.md');
const tte = require('./lib').default;
const options = {
  alignWithJava8: true,
  executableJavaPath: 'java/lib/jvm/jre-1.8.0-openjdk-1.8.0.265.b01-1.lambda2.0.1.x86_64/bin/java',
  firstVersionOfTika: true,
};

module.exports.handler = async () => {
  return tte
    .startServer('tika-server.jar', options)
    .then(() => tte.extract(testFile))
    .then(console.log)
    .catch(console.log);
};
