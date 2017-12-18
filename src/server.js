import {exec} from 'child_process';

/**
 * Starts a Tika Server on a default localhost:9998
 * @param {String} artifactPath Full path to .jar file of Tika Server
 * @return {Promise.<void>} Resolves when server is started
 */
export function startServer(artifactPath) {
  if (!artifactPath) {
    throw new Error('Please provide path to Tika Server Artifact');
  }

  const startCommand = `java -Duser.home=/tmp -jar ${artifactPath}`;

  return new Promise((resolve, reject) => {
    exec(startCommand).stderr.on('data', data => {
      const isTika1_14Started = data.indexOf('INFO: Started') > -1;
      const isTika1_17Started = data.indexOf('Started Apache Tika server ') > -1;
      const isStarted = isTika1_14Started || isTika1_17Started;
      const isError = data.match(/java.*Exception|error/i);

      if (isStarted) {
        resolve();
      }

      if (isError) {
        reject(new Error(data));
      }
    });
  });
}
