export const LOGIN_USER = (state,payload) => {
  state.userInfo = payload;
}

export const AUTHENTICATE_USER = (state, payload) => {
  state.isAuthenticated = payload;
}

export const USER_LOG_OUT = (state) => {
  state.userInfo = {};
}