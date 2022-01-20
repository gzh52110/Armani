import axios from 'axios';
export const host = "http://localhost:8889"
const baseURL = host+'/api'
const instance = axios.create({
    baseURL,
   
  });
// 请求拦截：所有通关过instance发出的请求，都会进入以下代码
instance.interceptors.request.use(function (config) {
  // config={url,method,data,headers,params}
  let user = localStorage.getItem("user");
   try {
       user = JSON.parse(user) || {};
   } catch (err) {
       user = {};
   }
  config.headers.Authorization = user.authorization
   return config;
 }, function (error) {
   // Do something with request error
   return Promise.reject(error);
 });

  export default instance