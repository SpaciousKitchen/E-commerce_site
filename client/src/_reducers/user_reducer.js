import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    KKO_LOGIN,
    // GGL_LOGIN,
    // NVR_LOGIN,
} from '../_actions/_types';
 
export default function userReducer (state={},action){
  switch(action.type){
    case REGISTER_USER:
      return {...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return {...state, userData: action.payload };
    case KKO_LOGIN:
      return {...state, loginSucces: action.payload };
    case LOGOUT_USER:
      return {...state };
    default:
      return state;
  };
};