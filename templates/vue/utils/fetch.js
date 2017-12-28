import SubmissionError from '../error/SubmissionError';
import { API_HOST, API_PATH } from '../config/_entrypoint';

const jsonMimeType = 'application/json';

export default function (url, options = {}) {
  if ('undefined' === typeof options.headers) options.headers = new Headers();
  if (null === options.headers.get('Accept')) options.headers.set('Accept', jsonMimeType);

  if ('undefined' !== options.body && !(options.body instanceof FormData) && null === options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', jsonMimeType);
  }

  const link = url.includes(API_PATH) ? API_HOST + url : API_HOST + API_PATH + url;

  return fetch(link, options).then(response => {
    if (response.ok) return response;

    return response
      .json()
      .then(json => {
        const error = response.statusText;
        if (!json.violations) throw Error(error);

        let errors = {_error: error};
        json.violations.map((violation) => errors[violation.propertyPath] = violation.message);

        throw new SubmissionError(errors);
      });
  });
}
