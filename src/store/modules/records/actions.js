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

export const UPDATE_ACCOUNT = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'put',
      url:'/records/account',
      params: { 
        id:payload.account.id
      },
      data:payload,
    })
    .then(res => {
      context.commit('UPDATE_ACCOUNT',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const DELETE_ACCOUNT = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'delete',
      url:'/records/account',
      params: { 
        id:payload
      },
    })
    .then(res => {
      context.commit('DELETE_ACCOUNT',payload);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const GET_ALL_ACCOUNTS = (context) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'get',
      url:'/records/account',
    })
    .then(res => {
      context.commit('SET_ALL_ACCOUNTS',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

