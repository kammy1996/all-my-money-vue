export const TURN_ON_DARK_MODE = (state,payload) => { 
  state.isDark = payload
}

export const SHOW_SNACKBAR = (state,snackbar) => { 
  state.snackbar = snackbar;
}

export const RESET_SNACKBAR = (state) => { 
  state.snackbar = { 
    show:false,
    color:'',
    text:''
  }
}
