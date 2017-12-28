/**
 * Sends a JSON request to the API.
 *
 * @param {string} url
 * @param {object} options
 * @return {Promise.<object>} An object with a response key (the original HTTP response) and an optional body key (the parsed JSON-LD body)
 */
export default function fetchSwagger(url, options = {}) {
  const jsonMimeType = 'application/json';

  if ('undefined' === typeof options.headers) {
    options.headers = new Headers();
  }

  if (null === options.headers.get('Accept')) {
    options.headers.set('Accept', jsonMimeType);
  }

  if ('undefined' !== options.body && !(typeof FormData !== 'undefined' && options.body instanceof FormData) && null === options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', jsonMimeType);
  }

  return fetch(url, options)
    .then(response => {
      if (false === response.ok || !response.headers.has('Content-Type') || !response.headers.get('Content-Type').includes(jsonMimeType)) {
        return Promise.reject({ response });
      }

      return Promise.resolve(response.json().then(body => ({ response, body, document: body })));
    });
}
