import {startServer} from './server';

jest.mock('child_process');
import childProcess from 'child_process';

it('should expose startServer function', () => {
  expect(startServer).toBeInstanceOf(Function);
});

it('should throw if artifact path is not provided', () => {
  expect(startServer).toThrow('Please provide path to Tika Server Artifact');
});

it('should call exec to spawn a Tika Server', async() => {
  childProcess.exec = jest.fn(() => {
    return {
      stderr: {on: jest.fn((_, cb) => cb('INFO: Started'))}
    };
  });

  await startServer('/tmp/tika.jar');

  expect(childProcess.exec).toBeCalled();
});

it('should reject if some Java exception occurs', async() => {
  childProcess.exec = jest.fn(() => {
    return {
      stderr: {
        on: jest.fn((_, cb) =>
          cb('java.net.BindException: Address already in use'))
      }
    };
  });

  try {
    await startServer('/tmp/tika.jar');
  } catch (error) {
    expect(error.message)
      .toBe('java.net.BindException: Address already in use');
  }
});
