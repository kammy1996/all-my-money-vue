
export const ADD_ACCOUNT = (state,payload ) => {
  let accountIndex = state.accounts.findIndex(i => i.id == payload.id)
  if(accountIndex < 0) { 
    state.accounts.push(payload);
  }
}

export const UPDATE_ACCOUNT = (state,payload ) => {
  let accountIndex = state.accounts.findIndex(i => i.id == payload.id)
  if(accountIndex >= 0) { 
    const {name,color,type,balance,currency} = payload
    state.accounts[accountIndex].name = name;
    state.accounts[accountIndex].color = color;
    state.accounts[accountIndex].type = type;
    state.accounts[accountIndex].balance = balance;
    state.accounts[accountIndex].currency = currency;
  }
}

export const DELETE_ACCOUNT = (state,payload) => { 
  let accountIndex = state.accounts.findIndex(i => i.id == payload);
  if(accountIndex >= 0) { 
    state.accounts.splice(accountIndex,1)
  }
}

export const SET_ALL_ACCOUNTS = (state,payload) => { 
  state.accounts = payload;
}

export const ADD_CATEGORY = (state,payload) => { 
  let categoryIndex = state.categories.findIndex(i => i.id == payload.id) ;
  if(categoryIndex < 0) { 
    state.categories.push(payload);
  }
}

export const UPDATE_CATEGORY = (state,payload) => { 
  let categoryIndex = state.categories.findIndex(i => i.id == payload.id);
  if(categoryIndex >= 0) { 
    state.categories[categoryIndex].name = payload.name;
    state.categories[categoryIndex].icon = payload.icon;
  }
}

export const SET_ALL_CATEGORIES = (state,payload) => { 
  payload.forEach(item => {
    let checkExist = state.categories.findIndex(cat => cat.id == item.id) 
    if(checkExist < 0) {    
      state.categories.push(item)
    }
  })
}

export const DELETE_CATEGORY = (state,payload) => { 
  let categoryIndex = state.categories.findIndex(i => i.id == payload);
  if(categoryIndex >= 0) { 
    state.categories.splice(categoryIndex,1)
  }
}

