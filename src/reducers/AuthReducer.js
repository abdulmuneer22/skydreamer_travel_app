///-----------------------------------------------------------------
///   Class:          AuthReducer.js
///   Description:    Reducer file for Auth Actions
///   Author:         Guilherme Borges Bastos       Date: 16/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:           Description:
///-----------------------------------------------------------------
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAIL,
  LOGIN_FACEBOOK
} from '../actions/types';

const INITIAL_STATE = {
  email: 'guilhermeborgesbastos@gmail.com',
  password: 'teste',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };  // *
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case LOGIN_FACEBOOK:
      return {
        ...state,
        loading: true,
        error: ''
      };  // *
    case LOGIN_FACEBOOK_SUCCESS:
      console.log("action asdasd", action);
      return {
        ...state,
        facebookData: action.data,
        loading: false
      };
    case LOGIN_FACEBOOK_FAIL:
      return {
        ...state,
        facebookData: {},
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
};
