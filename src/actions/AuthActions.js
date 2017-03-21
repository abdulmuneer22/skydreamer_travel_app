import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk'; // Start Facebook initialization

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_FACEBOOK_LOADING,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAIL,
} from './types';

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

const FACEBOOK_PERMISSIONS = ['public_profile', 'email', 'user_location'];
const FIELDS = 'name,gender,locale,location,email';
const GRAPH_REQUEST_PARAMS = {
  httpMethod: 'GET',
  version: 'v2.8',
  appId: '251686075279620',
  appId: '24b433ce76791790109fca83faa35abe',
  parameters: {
    fields: {
      string: FIELDS,
    },
  },
};
// End Facebook initialization

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const loginUser = (id_firebase, email, name, photo) => {
    // Get data from our server
  fetch('https://api.skydreamer.io/users/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      cookie: 'sess_skydreamer=au529dj3nr38nqiacp1nancgp7',
    },
    body: `id_facebook=${id_facebook}&id_firebase=${id_firebase}&email=${email}&name=${name}&photo=${photo}`,
  })
    .then(response => response.json())
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


const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

/**
 * Title: Facebook auth flow
 * Author: Alberto Schiabel
 * refactored by: Guilherme Borges Bastos -> Added Slim Framework and Firebase Signin and Auth
 */

const loginFacebookFail = error => ({
  type: LOGIN_FACEBOOK_FAIL,
  error,
});

const facebookGraphRequestCallback = (error, result) => (
  (dispatch) => {
    if (error) {
      console.log('error@facebookGraphRequestCallback', error);
      dispatch(loginFacebookFail(error));
    } else {
      console.log('result@facebookGraphRequestCallback', result);
      loginFacebookSuccess(dispatch, result);
    }
  }
);

export const loginUserViaFacebook = () => (
  (dispatch) => {
    dispatch({ type: LOGIN_FACEBOOK_LOADING });
    console.log('loginUserViaFacebook dispatch', dispatch);
    LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSIONS).then(
      (result) => {
        console.log('result 133:', result);
        if (result.isCancelled) {
          console.log('result isCancelled');
          dispatch(loginFacebookFail('User cancelled login'));
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              // Sign in with the credential from the Facebook user.
              firebase.auth().signInWithCredential(credential).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                loginFacebookFail(errorMessage);

              }).then(
                (result) => { // successfully added on Firebase
                  console.log('result', result);
                  console.log('result.uid', result.uid);
                  console.log('result.displayName', result.displayName);
                  console.log('result.email', result.email);
                  console.log('result.photoURL', result.photoURL);

                  var uid = result.uid;
                  var id_facebook = data.userID;
                  var name = result.displayName;
                  var email = result.email;
                  var photoURL = result.photoURL;

                  loginUserSuccess(dispatch, result);;

                  //@TODO: enable the signin on Slim Framework
                  loginUser(uid, email, name, photoURL);

              });

              /*
              // https://developers.facebook.com/docs/graph-api/reference/v2.8/user/
              new GraphRequestManager()
                .addRequest(new GraphRequest(data.userID,
                             GRAPH_REQUEST_PARAMS,
                             (error, result) => dispatch(facebookGraphRequestCallback(error, result)),
                            )).start();
              */
            });
        }
      },
      (error) => {
        console.log('handleError', error);
        handleError(error);
      },
    );
  }
);

const loginFacebookSuccess = (dispatch, facebookData) => {
  console.log('dispatch@loginFacebookSuccess 173', dispatch);
  console.log('facebookData@loginFacebookSuccess 174', facebookData);
  AsyncStorage.setItem('email', facebookData.email);
  AsyncStorage.setItem('gender', facebookData.gender);
  AsyncStorage.setItem('fb_id', facebookData.id);
  AsyncStorage.setItem('fb_locale', facebookData.locale);
  AsyncStorage.setItem('fb_location', facebookData.location.name);
  AsyncStorage.setItem('fb_name', facebookData.name);

  dispatch({
    type: LOGIN_FACEBOOK_SUCCESS,
    data: facebookData,
  });

  // Actions.main();
};

// End Facebook stuff

const loginUserSuccess = (dispatch, user) => {
  // persistent data
  AsyncStorage.setItem('userid', user.userid);
  AsyncStorage.setItem('registration_id', user.registration_id);
  AsyncStorage.setItem('id_firebase', user.id_firebase);
  AsyncStorage.setItem('id_facebook', user.id_facebook);
  AsyncStorage.setItem('name', user.name);
  AsyncStorage.setItem('email', user.email);

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });

  Actions.main();
};
