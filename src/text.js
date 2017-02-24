import got from 'got';
import intoStream from 'into-stream';
import getStream from 'get-stream';

const URL = 'http://localhost:9998/tika';

/**
 * Extract text from a document
 * @param {Buffer|String|Promise} input File to extract text from
 * @return {Promise.<String>} Extracted text
 */
export function extract(input = '') {
  const fileStream = intoStream(input);
  const tikaStream = got.stream.put(URL, {
    headers: {Accept: 'text/plain'}
  });

  return getStream(fileStream.pipe(tikaStream));
}
