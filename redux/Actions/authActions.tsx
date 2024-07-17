import { AuthTypes } from "../ActionTypes";



function login(payload) {
    console.log('pay load is <<<<<<<<', payload);
  return {
    type: AuthTypes.LOGIN_REQUEST,
    payload
  };
}

function logout() {
  return {
    type: AuthTypes.LOGOUT_REQUEST,
  };
}

function guestLogin(){
  console.log('logged in as guest !!!')
  return{
    type :AuthTypes.GUEST_LOGIN
  }
}


function register(payload){
  return {
      type : AuthTypes.REGISTER_REQUEST,
      payload
  }
}

export { login, logout , guestLogin , register};
