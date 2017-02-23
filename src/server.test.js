import {startServer} from './server';

jest.mock('child_process');
import {exec} from 'child_process';

it('should expose startServer function', () => {
  expect(startServer).toBeInstanceOf(Function);
});

it('should throw if artifact path is not provided', () => {
  expect(startServer).toThrow('Please provide path to Tika Server Artifact');
});

it('should call exec to spawn a Tika Server', async() => {
  await startServer('/tmp/tika.jar');

  expect(exec).toBeCalled();
});
