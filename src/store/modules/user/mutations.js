export const LOGIN_USER = (state,payload) => {
  state.userInfo = payload;
}

export const USER_LOG_OUT = (state) => {
  state.userInfo = {};
}