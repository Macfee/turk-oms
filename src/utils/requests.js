import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import { getToken } from '../utils/auth'

const service = axios.create({
  baseURL: "http://127.0.0.1:8080/api", // api的base_url
  timeout: 15000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response;
    if (res.status !== 200) {
      this.$message({
        message: res.statusText,
        type: 'error',
        duration: 3 * 1000
      });

      // 401:未登录;
      if (res.status === 401||res.status === 403 || res.status === 405) {
         this.$message.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
           confirmButtonText: '重新登录',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           store.dispatch('FedLogOut').then(() => {
             location.reload()// 为了重新实例化vue-router对象 避免bug
           })
         })
       }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error);
    this.$message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error)
  });

export default service
