import {exec} from 'child_process';

/**
 * Starts a Tika Server on a default localhost:9998
 * @param {String} artifactPath Full path to .jar file of Tika Server
 */
export function startServer(artifactPath) {
  if (!artifactPath) {
    throw new Error('Please provide path to Tika Server Artifact');
  }

  const startCommand = `java -Duser.home=/tmp -jar ${artifactPath}`;

  return new Promise((resolve, reject) => {
    exec(startCommand).stderr.on('data', data => {
      const isStarted = data.indexOf('INFO: Started') > -1;
      const isError = data.match(/java.*Exception/);

      if (isStarted) {
        resolve();
      }

      if (isError) {
        reject(new Error(data));
      }
    });
  });
}
