import axios from "axios";
import app from '../main';
import Cookie from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.VUE_APP_HOST_URL,
}); 

if(Cookie.get(`token`)) { 
  instance.defaults.headers.common['Authorization'] = Cookie.get('token')
}

instance.interceptors.request.use(config => {
  app.$Progress.start();
  return config
})

instance.interceptors.response.use(response => {
  app.$Progress.finish();
  return response;
},(err) => {
  app.$Progress.fail();
  return err
})

export default instance;