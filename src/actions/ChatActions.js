import firebase from 'firebase';
import lodash from 'lodash';
import {
  OPEN_CHAT,
  ADD_NEW_MESSAGE,
  CHAT_MESSAGES_FETCH_SUCCESS,
  START_FETCHING_CHANNELS,
  RECEIVED_CHANNELS,
} from './types';

export const openChat = (id, fullname, photo, lastLogin) => ({
  type: OPEN_CHAT,
  payload: { id, fullname, photo, lastLogin },
});

export const addNewMessage = (type, text) => ({
  type: ADD_NEW_MESSAGE,
  payload: { type, text },
});

export const startFetchingChannels = () => ({
    type: START_FETCHING_CHANNELS
});

export const receivedChannels = () => ({
    type: RECEIVED_CHANNELS
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
  return function (dispatch) {
     dispatch(startFetchingChannels());
     var channelsArr  = [];
     var singleChannelsArr  = [];
     var query = firebase.database().ref(`/users/${userId}/channels`).orderByKey();
     query.once("value").then(function(snapshot) {
        const totalNum = snapshot.numChildren();
        var i = 1;
        snapshot.forEach(function(channels) {
          // key of user's channels
          var channelKey = channels.key;
          // childData will be the actual contents of the child
          var childData = channels.val();
          if (childData) {
            var channelRef = firebase.database().ref('/channels/'+ channelKey);
            channelRef.once('value').then(function(channelByKey) {
              var key = channelByKey.key;
              var type = channelByKey.val().type;
              var dataChannelByKey = channelByKey.val();
              // console.log('dataChannelByKey', dataChannelByKey);
              //actions for load info of a single chat between 2 users
              if(type === 'single') {
                var members = dataChannelByKey.members;
                //look on member list the friend from this logged userId
                Object.keys(members).forEach(function(key) {
                    if(key !== userId) {
                      //take the friend of this channelByKey
                      var queryFriendUser = firebase.database().ref(`/users/${key}`).orderByKey();
                      queryFriendUser.once("value").then(function(friendUser) {
                        var friendUserKey = channelByKey.key;
                        singleChannelsArr[friendUserKey] = friendUser.val();
                        //@TODO: we need to receive this props on ChatPeopleListItem
                        dataChannelByKey.first_name = friendUser.val().first_name;
                        dataChannelByKey.last_name = friendUser.val().last_name;
                        dataChannelByKey.photo = friendUser.val().photo;
                        //*/
                      }, function(error) {
                        console.error(error);
                      });
                    }
                });
              }
              channelsArr.push(dataChannelByKey);
              if(i === totalNum) {
                  dispatch({
                      type: RECEIVED_CHANNELS,
                      channels: channelsArr,
                      singleChannels: singleChannelsArr
                  });
              }
              i++;
            });
          }
        });
      }, function(error) {
        console.error(error);
     });
  };
};
