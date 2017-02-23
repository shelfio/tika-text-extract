import {exec} from 'child_process';

/**
 * Starts a Tika Server on a default localhost:9998
 */
export function startServer(artifactPath) {
  if (!artifactPath) {
    throw new Error('Please provide path to Tika Server Artifact');
  }

  const startCommand = `java -Duser.home=/tmp -jar ${artifactPath}`;

  exec(startCommand);
}
