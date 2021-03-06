import axios from '@/helpers/axiosConfig';

export const ADD_ACCOUNT = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'post',
      url:'/records/account',
      data: { 
        account: payload 
      }
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
        id:payload.id
      },
      data: { 
        account: payload
      }
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

export const ADD_CATEGORY = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'post',
      url:'/records/category',
      data:{ 
        category: payload 
      }
    })
    .then(res => {
      context.commit('ADD_CATEGORY',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const UPDATE_CATEGORY = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'put',
      url:'/records/category',
      data:{ 
        category: payload 
      },
      params:{
        id: payload.id
      }
    })
    .then(res => {
      context.commit('UPDATE_CATEGORY',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const DELETE_CATEGORY = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'DELETE',
      url:'/records/category',
      params:{
        id: payload
      }
    })
    .then(res => {
      context.commit('DELETE_CATEGORY',payload);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const GET_ALL_CATEGORIES = (context) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'get',
      url:'/records/category',
    })
    .then(res => {
      context.commit('SET_ALL_CATEGORIES',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const ADD_LABEL = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'post',
      url:'/records/label',
      data: { 
        label:payload
      }
    })
    .then(res => {
      context.commit('ADD_LABEL',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const GET_ALL_LABELS = (context) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'get',
      url:'/records/label',
    })
    .then(res => {
      context.commit('SET_ALL_LABELS',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const UPDATE_LABEL = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'put',
      url:'/records/label',
      data:{ 
        label: payload 
      },
      params:{
        id: payload.id
      }
    })
    .then(res => {
      context.commit('UPDATE_LABEL',res.data);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}


export const DELETE_LABEL = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'DELETE',
      url:'/records/label',
      params:{
        id: payload
      }
    })
    .then(res => {
      context.commit('DELETE_LABEL',payload);
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}


export const ADD_RECORD = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'post',
      url:'/records',
      data: { 
        record: payload 
      }
    })
    .then(res => {
      let record = res.data;
      let recordAction = 'add';
      context.commit('ADD_RECORD',record)
      context.commit('UPDATE_ACCOUNT_BALANCE',{ recordAction , record} )
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const UPDATE_RECORD = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'put',
      url:'/records',
      data: { 
        record: payload 
      },
      params: { 
        id: payload.id
      }
    })
    .then(res => {
      let record = res.data;
      let recordAction = 'update';
      context.commit('UPDATE_RECORD',record)
      context.commit(`UPDATE_ACCOUNT_BALANCE`,{ recordAction , record})
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const GET_RECORDS = (context,payload) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url : '/records',
      params: { 
        perPage: payload.itemsPerPage,
        page:payload.page,
        order:payload.order
      }
    })
    .then(res => { 
      resolve(res.data)
      context.commit(`SET_RECORDS`,res.data);
    })
    .catch(err => {
      reject(err)
    })
  })  
}

export const GET_TOTAL_FILTERED_RECORDS = (context,queryString) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url : '/records/filtered/total',
      params: { 
        query:queryString
      }
    })
    .then(res => { 
      resolve(res.data)
      context.commit(`SET_TOTAL_RECORDS_LENGTH`,res.data);
    })
    .catch(err => {
      reject(err)
    })
  })  
}

export const GET_TOTAL_DATE_FILTERED_RECORDS = (context,{startDate,endDate}) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url : '/records/date-filtered/total',
      params: { 
        startDate,endDate
      }
    })
    .then(res => { 
      resolve(res.data)
      context.commit(`SET_TOTAL_RECORDS_LENGTH`,res.data);
    })
    .catch(err => {
      reject(err)
    })
  })  
}

export const GET_DATE_FILTERED_RECORDS = (context,{perPage,page,order,startDate,endDate}) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url : '/records/date-filtered',
      params: { 
        startDate,endDate,perPage,page,order,
      }
    })
    .then(res => { 
      resolve(res.data)
      context.commit(`SET_RECORDS`,res.data);
    })
    .catch(err => {
      reject(err)
    })
  })  
}

export const GET_FILTERED_RECORDS = (context,{ queryString, page , perPage,order}) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url : '/records/filtered',
      params: { 
        query:queryString,
        page: page,
        perPage: perPage,
        order:order
      },
    })
    .then(res => { 
      resolve(res.data)
      context.commit(`SET_RECORDS`,res.data);
    })
    .catch(err => {
      reject(err)
    })
  })  
}

export const GET_TOTAL_RECORDS = (context) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url : '/records/total'
    })
    .then(res => { 
      context.commit(`SET_TOTAL_RECORDS_LENGTH`,res.data)
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })  
}


export const DELETE_RECORD = (context,payload) => {
  return new Promise((resolve,reject) => {
    axios({
      method :'DELETE',
      url:'/records',
      params:{
        id: payload
      }
    })
    .then(res => {
      let record = res.data;
      let recordAction = 'delete';
      context.commit('DELETE_RECORD',record);
      context.commit(`UPDATE_ACCOUNT_BALANCE`,{ recordAction , record})
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}
