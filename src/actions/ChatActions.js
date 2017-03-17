import firebase from 'firebase';
import lodash from 'lodash';
import {
  OPEN_CHAT,
  ADD_NEW_MESSAGE,
  CHAT_LIST_FETCH_SUCCESS,
  CHAT_MESSAGES_FETCH_SUCCESS
} from './types';

export const openChat = (id, fullname, photo, lastLogin) => ({
  type: OPEN_CHAT,
  payload: { id, fullname, photo, lastLogin },
});

export const addNewMessage = (type, text) => ({
  type: ADD_NEW_MESSAGE,
  payload: { type, text },
});

export const chatMessagesFetch = (route, chatId) => {
  return (dispatch) => {
    firebase.database().ref(`/${route}/${chatId}/messages`)
      .on('value', snapshot => {
        dispatch({ type: CHAT_MESSAGES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

// firebase.database().ref(`/users/${userId}/friends/${friendUserId}/messages`)
// export const chatListFetch = (userId, friendUserId) => {


export const chatListFetch = (userId) => {

  return (dispatch) => {
    var chatUsers  = [];
    var mergedArr = [];

    var ref = firebase.app().database().ref(`/users/${userId}/friends`);

    ref.on('value', snapshot => {
       console.log(' ******** ChatActions -> chatUsers called ********');
       chatUsers = snapshot.val();
       firebase.database().ref(`/users/${userId}/groups`)
         .on('value', snapshot2 => {
           console.log(' ******** ChatActions -> chatGroups called ********');
           mergedArr = lodash.merge(snapshot2.val(), chatUsers);
           dispatch({ type: CHAT_LIST_FETCH_SUCCESS, payload: mergedArr });
         });
     });
  };
};
