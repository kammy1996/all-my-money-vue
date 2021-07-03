import axios from 'axios';

export const ADD_ACCOUNT = (context,payload) => {
  console.log(payload)
  return new Promise((resolve,reject) => {
    axios({
      method :'post',
      url:'/records/account',
      data:payload
    })
    .then(res => {
      context.commit('records/ADD_ACCOUNT',res.data)
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}