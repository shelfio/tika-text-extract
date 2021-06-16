import * as tte from './index';

it('should expose extract and startServer functions', () => {
  expect(tte.extract).toBeInstanceOf(Function);
  expect(tte.startServer).toBeInstanceOf(Function);
});
