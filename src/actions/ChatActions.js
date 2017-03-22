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
     // console.log('chatListFetch called');
     var channelsArr  = [];
     var query = firebase.database().ref(`/users/${userId}/channels`).orderByKey();
     query.once("value")
     .then((snapshot) => {
        const totalNum = snapshot.numChildren();
        var i = 1;
        // console.log('Size', snapshot.numChildren());
        snapshot.forEach((channels) => {
          // key of user's channels
          var channelKey = channels.key;
          // childData will be the actual contents of the child
          var childData = channels.val();
          if (childData) {
            var channelRef = firebase.database().ref('/channels/'+ channelKey);
            channelRef.once('value')
            .then((channelByKey) => {
              var key = channelByKey.key;
              var type = channelByKey.val().type;
              var dataChannelByKey = channelByKey.val();
              // console.log('dataChannelByKey', dataChannelByKey);
              //actions for load info of a single chat between 2 users
              if(type === 'single') {
                var members = dataChannelByKey.members;
                //look on member list the friend from this logged userId
                Object.keys(members).forEach((key) => {
                    if(key !== userId) {
                      // console.log('Other Friend:');
                      // console.log(key, members[key]);
                      //take the friend of this channelByKey
                      var queryFriendUser = firebase.database().ref(`/users/${key}`).orderByKey();
                      queryFriendUser.once("value")
                      .then((friendUser) => {
                        // console.log('friendUser > Obj:', friendUser.val());
                        // dataChannelByKey.friendObj = friendUser.val();
                        dataChannelByKey.first_name = friendUser.val().first_name;
                        dataChannelByKey.last_name = friendUser.val().last_name;
                        dataChannelByKey.photo = friendUser.val().photo;
                      })
                      .catch((error) => {
                        console.error('Error in ChatActions.chatListFetch promise chain', error);
                      });
                    }
                });
              }
              /*
              console.log('---------------------------------------------------------');
              console.log('TYPE', type);
              console.log('members', members);
              console.log('channelByKey', channelByKey);
              console.log('channelByKey.key', channelByKey.key);
              console.log('dataChannelByKey', dataChannelByKey);
              console.log('channelByKey.val().noteObject', channelByKey.val());
              console.log('---------------------------------------------------------');
              console.log('');*/
              //channelsArr.push({key: channelByKey.val()})
              channelsArr.push(dataChannelByKey);
              if(i === totalNum) {
                console.log('ChannelsArr', channelsArr);
                dispatch({ type: CHAT_LIST_FETCH_SUCCESS, payload: channelsArr });
              }
              i++;
            });
          }
        });
      })
      .catch((error) => {
        console.error('Error in ChatActions.chatListFetch promise', error);
     });
  };
};
