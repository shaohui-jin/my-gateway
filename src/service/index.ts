import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { Session } from '@/utils/storage';
import { ElMessage, ElMessageBox } from 'element-plus';
const service = axios.create({
  // baseURL: '/',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (Session.get('token')) {
      config?.headers?.common.setAuthorization(`${Session.get('token')}`);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        Session.clear(); // 清除浏览器全部临时缓存
        window.location.href = '/'; // 去登录页
        ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
          .then(() => {})
          .catch(() => {});
      }
      return Promise.reject(service.interceptors.response);
    } else {
      return response.data;
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时');
    } else if (error.message == 'Network Error') {
      ElMessage.error('网络连接错误');
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error('接口路径找不到');
    }
    return Promise.reject(error);
  }
);

export default service;
