
import { AuthTypes } from "../ActionTypes";

const initialState = {
  name: '',
  email: '',
  phone: '',
  token: '',
  userId: '',
  loading: false,
  guestLogin : false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        name: action.data.user.name,
        userId: action.data.user._id,
        phone: action.data.user.phone,
        token: action.data.token,
        loading: false
      };
    case AuthTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false
      };
    case AuthTypes.LOGOUT_REQUEST:
      return {
        ...initialState
      };
      case AuthTypes.REGISTER_REQUEST:
        return {
          ...state,
          loading: true
        };

      case  AuthTypes.REGISTER_SUCCESS:
        return {
          ...state,
          name: action.data.user.name,
          userId: action.data.user._id,
          phone: action.data.user.phone,
          token: action.data.token,
          loading: false
        };
     case AuthTypes.REGISTER_ERROR:
      return {
        ...state,
        loading: false
      };

      case AuthTypes.GUEST_LOGIN:
        return {
          ...state,
          guestLogin : true
        }
    default:
      return state;
  }
};
