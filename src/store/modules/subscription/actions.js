import axios from '@/helpers/axiosConfig';

export const ADD_SUBSCRIPTION_CATEGORY = (context,category) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'POST',
      url:'/subscription',
      data: { 
        category :category
      }
    })
    .then((res) =>  { 
      context.commit(`ADD_SUBSCRIPTION_CATEGORY`,res.data)
      resolve(res.data)
    })
    .catch((err) => { 
      reject(err)
    })
  })
}

export const GET_SUBSCRIPTION_CATEGORIES = (context) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'GET',
      url:'/subscription',
    })
    .then((res) =>  { 
      context.commit(`SET_SUBSCRIPTION_CATEGORIES`,res.data)
      resolve(res.data)
    })
    .catch((err) => { 
      reject(err)
    })
  })
}

export const UPDATE_SUBSCRIPTION_CATEGORY = (context,category) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'PUT',
      url:'/subscription',
      data: { 
        category: category
      },
      params: { 
        categoryId:category.id
      }
    })
    .then((res) =>  { 
      context.commit(`UPDATE_SUBSCRIPTION_CATEGORY`,res.data)
      resolve(res.data)
    })
    .catch((err) => { 
      reject(err)
    })
  })
}

export const DELETE_SUBSCRIPTION_CATEGORY = (context,categoryId) => { 
  return new Promise((resolve,reject) => { 
    axios({
      method:'DELETE',
      url:'/subscription',
      params: { 
        categoryId:categoryId
      }
    })
    .then((res) =>  { 
      context.commit(`DELETE_SUBSCRIPTION_CATEGORY`,categoryId)
      resolve(res.data)
    })
    .catch((err) => { 
      reject(err)
    })
  })
}
