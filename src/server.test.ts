jest.mock('child_process');

import childProcess from 'child_process';
import { startServer } from './server';

it('should throw if artifact path is not provided', () => {
  expect(startServer).toThrow('Please provide path to Tika Server Artifact');
});

it('should call exec to spawn a Tika Server', async () => {
  childProcess.exec.mockReturnValueOnce({
    stderr: { on: jest.fn((_, cb) => cb('INFO: Started')) },
  });

  await startServer('/tmp/tika.jar');

  expect(childProcess.exec).toHaveBeenCalledWith(
    'java --add-modules=java.xml.bind,java.activation -Duser.home=/tmp -jar /tmp/tika.jar'
  );
});

it('should call exec to spawn a Tika Server with custom java path', async () => {
  childProcess.exec.mockReturnValueOnce({
    stderr: { on: jest.fn((_, cb) => cb('INFO: Started')) },
  });

  await startServer('/tmp/tika.jar', { executableJavaPath: '/bin/jre/java' });

  expect(childProcess.exec).toHaveBeenCalledWith(
    '/bin/jre/java --add-modules=java.xml.bind,java.activation -Duser.home=/tmp -jar /tmp/tika.jar'
  );
});

it('should call exec to spawn a Tika Server and align with Java 8 version', async () => {
  childProcess.exec.mockReturnValueOnce({
    stderr: { on: jest.fn((_, cb) => cb('INFO: Started')) },
  });

  await startServer('/tmp/tika.jar', { alignWithJava8: true });

  expect(childProcess.exec).toHaveBeenCalledWith('java  -Duser.home=/tmp -jar /tmp/tika.jar');
});

it('should reject if some Java exception occurs', async () => {
  childProcess.exec.mockReturnValueOnce({
    stderr: {
      on: jest.fn((_, cb) => cb('java.net.BindException: Address already in use')),
    },
  });

  try {
    await startServer('/tmp/tika.jar');
  } catch (error) {
    expect(error.message).toBe('java.net.BindException: Address already in use');
  }
});

it('should reject if file not found', async () => {
  childProcess.exec.mockReturnValueOnce({
    stderr: {
      on: jest.fn((_, cb) => cb('Error: Unable to access jarfile')),
    },
  });

  try {
    await startServer('/tmp/tika.jar');
  } catch (error) {
    expect(error.message).toBe('Error: Unable to access jarfile');
  }
});
