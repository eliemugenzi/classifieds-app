import axios, { AxiosRequestConfig } from 'axios';
import config from '@app/config';
import getToken from '@app/utils/api/getToken';

const responseHandlet = (response: any) => response.data;
const errorHandler = (error: any) => {
  if (error.response)
    return Promise.reject({
      ...error,
      ...error.response.data,
    });
  else if (error.message)
    return Promise.reject({ ...error, response: { data: error } });
  else return Promise.reject(new Error('Unknown Error!'));
};

const requestConfig = async (req: AxiosRequestConfig) => {
  const { token } = await getToken();

  console.log({ token });

  req.headers.Authorization = `JWT ${token}`;

  return req;
};

const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.response.use(responseHandlet, errorHandler);
api.interceptors.request.use(requestConfig);
export default api;
