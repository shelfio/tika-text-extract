const tte = require('../');
const testFile = require('fs').readFileSync('./README.md');

tte.startServer('/tmp/tika-server-1.14.jar')
  .then(() => tte.extract(testFile))
  .then(console.log)
  .catch(console.log);
