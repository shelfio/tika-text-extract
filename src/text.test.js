import {extract} from './text';

jest.mock('axios');
import axios from 'axios';
axios.put = jest.fn(() => Promise.resolve({data: 'extracted text'}));

it('should expose extract function', () => {
  expect(extract).toBeInstanceOf(Function);
});

it('should put file stream', async() => {
  await extract();

  expect(axios.put).toBeCalled();
});

it('should return extracted text', async() => {
  const text = await extract();

  expect(text).toBe('extracted text');
});
