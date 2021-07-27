import axios from '@/helpers/axiosConfig';

export const ADD_ACCOUNT = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'post',
      url:'/records/account',
      data:payload,
    })
    .then(res => {
      context.commit('ADD_ACCOUNT',res.data)
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}