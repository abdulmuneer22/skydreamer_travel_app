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
  metaInfo: { id, fullname, photo, lastLogin },
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


/**
 * From @jkomyno to @guilherme:
 * You don't want to have variables with the same name at different scopes levels inside the same method.
 * Also, never use var, they pollute the js file environment! Use let or const instead.
 * Avoid using 'function', please use arrow functions, otherwise we end up with a mixture of ES5 and ES6 and that
 * makes the code more difficult to read.
 * Are you really sure that we have to perform all these queries? All these nested forEach with _query.once() have
 * esponential time complexity.
 * When you console an error (btw remember that every exception should be caught and dealt with, a console.error doesn't suffice in production)
 * please remember to write some useful information about it. console.log("error", error) isn't humanly comprehensible.
 */
export const chatListFetch = (userId) =>
  (dispatch) => {
    dispatch(startFetchingChannels());
    let channelsArr  = [];
    let singleChannelsArr  = [];
    let query = firebase.database().ref(`/users/${userId}/channels`).orderByKey();
    query.once('value')
    .then((snapshot) => {
      const totalNum = snapshot.numChildren();
      console.log('totalNum', totalNum);
      snapshot.forEach((channel, index) => {
        console.log('**index**', index);
        let channelKey = channel.key;  // key of user's channels
        let childData = channel.val(); // actual contents of the child
        if (childData) {
          let channelRef = firebase.database().ref('/channels/'+ channelKey);
          channelRef.once('value')
          .then((channelByKey) => {
            let key = channelByKey.key;
            let type = channelByKey.val().type;
            let dataChannelByKey = channelByKey.val();
            console.log('dataChannelByKey', dataChannelByKey);
            if(type === 'single') {
              let members = dataChannelByKey.members;
              //look on member list the friend from this logged userId
              Object.keys(members).forEach((memberKey) => {
                if(memberKey !== userId) {
                  //take the friend of this channelByKey
                  let queryFriendUser = firebase.database().ref(`/users/${memberKey}`).orderByKey();
                  queryFriendUser.once("value")
                  .then((friendUser) => {
                    let friendUserKey = channelByKey.key;
                    let friendUserVal = friendUser.val();
                    singleChannelsArr[friendUserKey] = friendUserVal;
                    const {
                      first_name,
                      last_name,
                      photo
                    } = friendUserVal;
                    //@TODO: we need to receive this props on ChatPeopleListItem
                    dataChannelByKey.first_name = first_name;
                    dataChannelByKey.last_name = last_name;
                    dataChannelByKey.photo = photo;
                  })
                  .catch((error) => {
                    console.error("Error retrieving friendUser inside Object.keys loop in chatListFetch", error);
                  });
                }
                console.log('memberIndex end');
              });
              console.log('Object.keys end', members);
            }
            channelsArr.push(dataChannelByKey);
            console.log('channelByKey block end', totalNum, channelsArr.length);
            if (channelsArr.length == totalNum) {
              console.log('channelsArr', JSON.stringify(channelsArr, null, 2));
              console.log('singleChannelsArr', singleChannelsArr);
              /**
               * It's too soon to dispatch the action, because we don't really know which properties every item of channelsArr has
               */
              dispatch({
                  type: RECEIVED_CHANNELS,
                  channels: channelsArr,
                  singleChannels: singleChannelsArr //empty
              });
            }
          })
          .catch((error) => {
            console.error("Error retrieving channelByKey from channelRef.once('value') in chatListFetch", error);
          });
          console.log('channelRef.once() end');
        }
        console.log('childData end', childData);
      });
      console.log('snapshot forEach end');
    })
    .catch((error) => {
      console.error("Error retrieving snapshot from query.once('value') in chatListFetch", error);
    });
  }

/*
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
                        //
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
*/
