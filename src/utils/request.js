import axios from 'axios';
export const host = "http://localhost:8889"
const baseURL = host+'/api'
const instance = axios.create({
    baseURL,
   
  });

  //请求拦截，设置请求头
instance.interceptors.request.use(function (config) {
  let userInfo = localStorage.getItem("userInfo");
  try {
    userInfo = JSON.parse(userInfo) || {};
  } catch (err) {
    userInfo = {};
  }
  
 config.headers.Authorization = userInfo.authorization

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

  export default instance