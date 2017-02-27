import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    //Get data from our server
    fetch('https://api.findmechat.com/auth/user/efetua_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            cookie: 'sess_findme=au529dj3nr38nqiacp1nancgp7'
        },
        body: 'email=' + email + '&senha=' + password
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData);
        // Check if login is valid
        if (responseData.success) {
          const user = responseData.data;
          loginUserSuccess(dispatch, user);
        } else {
          loginUserFail(dispatch);
        }
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  // persistent data
  AsyncStorage.setItem('token', user.token);
  AsyncStorage.setItem('userid', user.userid);
  AsyncStorage.setItem('registration_id', user.registration_id);
  AsyncStorage.setItem('name', user.name);
  AsyncStorage.setItem('email', user.email);

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.chat();
};
