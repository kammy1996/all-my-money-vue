export const ADD_ACCOUNT = (state,payload ) => {
  let accountIndex = state.accounts.findIndex(i => i.id == payload.id)
  if(accountIndex < 0) { 
    state.accounts.push(payload);
  }
}

export const UPDATE_ACCOUNT = (state,payload ) => {
  let accountIndex = state.accounts.findIndex(i => i.id == payload.id)
  if(accountIndex >= 0) { 
    const {name,color,type,startBalance,currency} = payload
    state.accounts[accountIndex].name = name;
    state.accounts[accountIndex].color = color;
    state.accounts[accountIndex].type = type;
    state.accounts[accountIndex].startBalance = startBalance;
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

