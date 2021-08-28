
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

export const ADD_LABEL = (state,payload ) => {
  let labelIndex = state.labels.findIndex(i => i.id == payload.id)
  if(labelIndex < 0) { 
    state.labels.push(payload);
  }
}

export const SET_ALL_LABELS = (state,payload) => { 
  payload.forEach(item => {
    let checkExist = state.labels.findIndex(cat => cat.id == item.id) 
    if(checkExist < 0) {    
      state.labels.push(item)
    }
  })
}


export const UPDATE_LABEL = (state,payload) => { 
  let labelIndex = state.labels.findIndex(i => i.id == payload.id);
  if(labelIndex >= 0) { 
    state.labels[labelIndex].name = payload.name;
    state.labels[labelIndex].color = payload.color;
  }
}

export const DELETE_LABEL = (state,payload) => { 
  let labelIndex = state.labels.findIndex(i => i.id == payload);
  if(labelIndex >= 0) { 
    state.labels.splice(labelIndex,1)
  }
}

export const SET_RECORDS = (state,payload) => { 
  state.records = payload;
}

export const ADD_RECORD = (state,payload ) => { 
  let recordIndex = state.records.findIndex(rec => rec.id == payload.id);
  if(recordIndex < 0) { 
    state.records.unshift(payload)
  }
}

export const SET_RECORD_OPTIONS = (state,options) => { 
  state.recordOptions = options;
}

export const SET_IS_RECORDS_FILTERED = (state,value) => { 
  state.isRecordsFiltered = value;
}

export const GO_TO_FIRST_PAGE_FOR_FILTER = (state) => { 
  state.recordOptions.page = 1;
}

export const SET_TOTAL_RECORDS_LENGTH = (state,totalRecords ) => { 
  state.totalRecords = totalRecords
}

export const TOGGLE_RECORD_DIALOG = ( state,payload) => { 
  state.isRecordDialog = payload;
}

export const SET_EXISTING_RECORD_VALUES = (state,payload) => { 
  let {id, source, account, type, date, amount, category, label, note, lastUpdated } = payload;
  state.record = {
   id, source, account,type,date,amount,category,label,note,lastUpdated
  }
}

export const RESET_RECORD_VALUES= (state) => { 
 state.record.id = null;
 state.record.source = null;
 state.record.type = null;
}

export const SET_RECORD_STATE = (state,payload) => { 
  state.recordState = payload;
}

export const SET_RECORD_TYPE = (state,type) => { 
  state.record.type = type;
}

export const UPDATE_RECORD = (state,payload) => { 
  let recordIndex = state.records.findIndex(rec => rec.id == payload.id);
  if(recordIndex >= 0 ) { 
    let {source, account, type, date, amount, category, label, note } = payload;
    state.records[recordIndex].source = source;
    state.records[recordIndex].account = account;
    state.records[recordIndex].type = type;
    state.records[recordIndex].date = date;
    state.records[recordIndex].amount = amount;
    state.records[recordIndex].category = category;
    state.records[recordIndex].label = label;
    state.records[recordIndex].note = note;
    
  }
}

export const DELETE_RECORD = (state,payload) => { 
  let recordIndex = state.records.findIndex(i => i.id == payload);
  if(recordIndex >= 0) { 
    state.records.splice(recordIndex,1)
  }
}

export const SET_RECORD_INFO_TO_DELETE = (state,record) => { 
  let recordIndex = state.records.findIndex(i => i.id == record.id);
  if(recordIndex >= 0) { 
    state.record.id = record.id,
    state.record.source = record.source
  }
}


