import axios from 'axios';

export const REGISTER_USER = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method: 'post',
      url:'/user/register',
      data: payload
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

export const USER_LOGIN = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method: 'put',
      url:'/user/login',
      data:payload
    })
    .then((res) => {
      resolve(res.data)
      context.commit(`LOGIN_USER`,res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}