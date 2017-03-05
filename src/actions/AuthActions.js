import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
// Start Facebook initialization
import FBSDK from 'react-native-fbsdk';

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

const FACEBOOK_PERMISSIONS = ['public_profile', 'email', 'user_location'];
const FIELDS = 'name,gender,locale,location,email';
const GRAPH_REQUEST_PARAMS = {
  httpMethod: 'GET',
  version: 'v2.8',
  parameters: {
    fields: {
      string: FIELDS
    }
  }
};
// End Facebook initialization

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_FACEBOOK,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAIL,
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

/**
 * Title: Facebook auth flow
 * Author: Alberto Schiabel
 */

const loginFacebookFail = (error) => ({
  type: LOGIN_FACEBOOK_FAIL,
  error
})

const facebookGraphRequestCallback = (error, result) => (
  (dispatch) => {
    if (error) {
      console.log("error@facebookGraphRequestCallback", error);
      dispatch(loginFacebookFail(error));
    } else {
      console.log("result@facebookGraphRequestCallback", result);
      loginFacebookSuccess(dispatch, result);
    }
  }
);

export const loginUserViaFacebook = () => (
  (dispatch) => {
    dispatch({ type: LOGIN_FACEBOOK });
    console.log("loginUserViaFacebook dispatch", dispatch);
    LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSIONS).then(
      (result) => {
        if (result.isCancelled) {
          console.log("result isCancelled");
          dispatch(loginFacebookFail("User cancelled login"));
        } else {
          console.log("calling facebookApiRequest");

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log('token data', data);
              // https://developers.facebook.com/docs/graph-api/reference/v2.8/user/
              new GraphRequestManager()
                .addRequest(new GraphRequest(data.userID,
                                             GRAPH_REQUEST_PARAMS,
                                             (error, result) => dispatch(facebookGraphRequestCallback(error, result))
                                            )).start();
            });
        }
      },
      (error) => {
        console.log("handleError", error);
        handleError(error);
      }
    );
  }
);

const loginFacebookSuccess = (dispatch, facebookData) => {
  console.log("dispatch@loginFacebookSuccess", dispatch);
  console.log("facebookData@loginFacebookSuccess", facebookData);
  AsyncStorage.setItem('email', facebookData.email);
  AsyncStorage.setItem('gender', facebookData.gender);
  AsyncStorage.setItem('fb_id', facebookData.id);
  AsyncStorage.setItem('fb_locale', facebookData.locale);
  AsyncStorage.setItem('fb_location', facebookData.location.name);
  AsyncStorage.setItem('fb_name', facebookData.name);

  dispatch({
    type: LOGIN_FACEBOOK_SUCCESS,
    data: facebookData
  });

  Actions.chat();
};

// End Facebook stuff

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
