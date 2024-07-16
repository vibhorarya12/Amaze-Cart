import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST } from "../ActionTypes/authTypes";

function login(payload) {
    console.log('pay load is <<<<<<<<', payload);
  return {
    type: LOGIN_REQUEST,
    payload
  };
}

function logout() {
  return {
    type: LOGOUT_REQUEST
  };
}

export { login, logout };
