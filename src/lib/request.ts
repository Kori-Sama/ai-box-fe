/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */

import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = '/api';

export default (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    withCredentials: false,
  });
  instance.interceptors.request.use(
    config => {
      // 处理请求头
      // 处理请求参数
      // 处理响应数据
      return config;
    },
    error => {
      // 处理请求错误
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    response => {
      // 处理响应数据
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance(config);
};
