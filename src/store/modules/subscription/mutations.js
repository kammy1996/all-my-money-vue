export const ADD_SUBSCRIPTION_CATEGORY = (state,category) => { 
  const categoryIndex =  state.categories.findIndex(cat => cat.id == category.id)
  if(categoryIndex < 0 ) { 
    state.categories.push(category)
  }
}

export const SET_SUBSCRIPTION_CATEGORIES = (state,categories) => { 
  categories.forEach(cat =>  {
      const catIndex = state.categories.findIndex(c => c.id == cat.id)
      if(catIndex < 0) {
        state.categories.push(cat)
      }
  })
}

export const UPDATE_SUBSCRIPTION_CATEGORY = (state,category) => { 
  const categoryIndex = state.categories.findIndex(cat => cat.id == category.id);
  if(categoryIndex >= 0) { 
    state.categories[categoryIndex] = category;
  }
}

export const DELETE_SUBSCRIPTION_CATEGORY = (state,category) => { 
  const categoryIndex = state.categories.findIndex(cat => cat.id == category.id);
  state.categories.splice(categoryIndex,1)
}