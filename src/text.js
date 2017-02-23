import {put} from 'axios';
import intoStream from 'into-stream';

const URL = 'http://localhost:9998/tika';

/**
 * Extract text from a document
 * @param {Buffer|String|Promise} input File to extract text from
 * @returns {Promise.<String>} Extracted text
 */
export function extract(input = '') {
  const fileStream = intoStream(input);
  const requestParams = {
    data: fileStream,
    headers: {Accept: 'text/plain'},
    maxContentLength: 100 * 1024 * 1024,
  };

  return put(URL, requestParams).then(response => response.data);
}
