const tte = require('./lib').default;
const testFile = require('fs').readFileSync('./Readme.md');
const options = {
  alignWithJava8: true,
  executableJavaPath:
    '/java-lambda-layer/java/lib/jvm/java-1.8.0-openjdk-1.8.0.222.b10-0.lambda2.0.1.x86_64/jre/bin/java',
};

module.exports.handler = async () => {
  return tte
    .startServer('/tmp/tika-server.jar', options)
    .then(() => tte.extract(testFile))
    .then(console.log)
    .catch(console.log);
};
