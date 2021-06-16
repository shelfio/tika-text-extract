const tte = require('../lib');
const testFile = require('fs').readFileSync('./README.md');

tte
  .startServer('/tmp/tika.jar')
  .then(() => tte.extract(testFile))
  .then(console.log)
  .catch(console.log);
