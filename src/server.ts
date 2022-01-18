import {exec} from 'child_process';
import {TextExtractionConfig} from './server.types';

const debug = require('debug')('tika-text-extract');

/**
 * Starts a Tika Server on a default localhost:9998
 * @param artifactPath Full path to .jar file of Tika Server
 * @param options Customize text extraction
 * @return Resolves when server is started
 */
export function startServer(artifactPath: string, options?: TextExtractionConfig): Promise<void> {
  console.log('artifactPath', artifactPath);
  if (!artifactPath) {
    throw new Error('Please provide path to Tika Server Artifact');
  }

  console.log('options', options);
  console.log('getOptionsBasedOnJavaVersion', getOptionsBasedOnJavaVersion(options));
  const startCommand = `${getExecutableJavaPath(options)} ${getOptionsBasedOnJavaVersion(
    options
  )} -Duser.home=/tmp -jar ${artifactPath}`;
  console.log('startCommand', startCommand);

  return new Promise((resolve, reject) => {
    exec(startCommand).stderr.on('data', data => {
      debug(data);
      console.log('data', data);

      const isTika1_14Started = data.indexOf('INFO: Started') > -1;
      console.log('isTika1_14Started', isTika1_14Started);

      const isTika1_17Started = data.indexOf('Started Apache Tika server ') > -1;
      console.log('isTika1_17Started', isTika1_17Started);

      const isStarted = isTika1_14Started || isTika1_17Started;
      console.log('isStarted', isStarted);
      const isError: boolean = data.match(/java.*Exception|error/i);
      console.log('isError', isError);

      if (isStarted) {
        resolve();
      }

      if (isError) {
        reject(new Error(data));
      }
    });
  });
}

function getExecutableJavaPath(options: TextExtractionConfig): string {
  if (options && options.executableJavaPath) {
    return options.executableJavaPath;
  }

  return 'java';
}

function getOptionsBasedOnJavaVersion(options: TextExtractionConfig): string {
  if (options && options.alignWithJava8) {
    return '';
  }

  return '--add-modules=java.xml.bind,java.activation';
}
