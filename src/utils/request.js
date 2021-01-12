import axios from 'axios';
import queryString from 'query-string';
import { API_BASE } from '../config';

export const makeUrlQueryParams = (queryCollection) => {
  const stringifiedQuery = queryString.stringify(queryCollection, {
    arrayFormat: 'none',
  });

  return `?${stringifiedQuery}`;
};

export const makeJsonRequestOptions = ({
  method,
  requestUrlPath,
  headers,
  data,
  ...rest
}) => ({
  method,
  url: `${API_BASE}/${requestUrlPath}`,
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
  ...(data ? { data } : {}),
  ...rest,
});

const request = (options) => axios(options);

export default request;
