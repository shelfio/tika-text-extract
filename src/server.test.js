import {startServer} from './server';

it('should expose startServer function', () => {
  expect(startServer).toBeInstanceOf(Function);
});
