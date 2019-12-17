jest.mock('got');

import {extract} from './text';
import intoStream from 'into-stream';
import MemoryStream from 'memorystream';
import got from 'got';

got.stream.put.mockImplementation(() => intoStream('extracted text').pipe(new MemoryStream()));

it('should allow passing stream', async () => {
  const text = await extract(intoStream('-test-stream'));
  expect(text).toBe('extracted text-test-stream');
});

it('should put file stream', async () => {
  await extract();

  expect(got.stream.put).toBeCalled();
});

it('should upload file to a Tika server', async () => {
  await extract();

  expect(got.stream.put)
    .toBeCalledWith('http://localhost:9998/tika', expect.anything());
});

it('should return extracted text', async () => {
  const text = await extract();

  expect(text).toBe('extracted text');
});
