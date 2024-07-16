import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST } from "../ActionTypes/authTypes";

const initialState = {
  name: '',
  email: '',
  phone: '',
  token: '',
  userId: '',
  loading: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.data.user.name,
        userId: action.data.user._id,
        phone: action.data.user.phone,
        token: action.data.token,
        loading: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false
      };
    case LOGOUT_REQUEST:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
