/**
 * @Class:             ChatActions.js
 * @Description:       Manage the Firebase Database to create the 'querys' to load the Chat and InternalChat
 * @Author:            Guilherme Borges Bastos      @Date: 02/03/2017
 * @Notes:

 * @Revision History:
 * @Name:                      @Date:      @Description:
 *  Guilherme Borges Bastos    14/03/2017  ChatActions refactored to be much cleaner and faster ( according to the Chrome report we increase the fetch list from Firebase in 24% ),
*/

import thunk from 'redux-thunk'
import firebase from 'firebase';
import Promise  from 'Promise';
import {
  OPEN_CHAT,
  ADD_NEW_MESSAGE,
  CHAT_MESSAGES_FETCH_SUCCESS,
  START_FETCHING_CHANNELS,
  RECEIVED_CHANNELS,
  START_FETCHING_MESSAGES,
} from './types';

let channelsArr  = [];
let userId = null;

export const openChat = (id, fullname, folder, photo, lastLogin) => {
  return (dispatch) => {
    dispatch({ type: OPEN_CHAT, metaInfo: { id, fullname, folder, photo, lastLogin } });
  };
};

export const addNewMessage = (channelId, type, text) => {
  console.log('ERROR::: addNewMessage ->');
  saveNewMessageFirebase(channelId, type, text);
  return (dispatch) => {
      dispatch({ type: ADD_NEW_MESSAGE, message: { channelId, type, text } });
  };
};

export const saveNewMessageFirebase = (channelId, type, text) => {
    const user = firebase.auth().currentUser;
    let messagesRef = firebase.database().ref(`/channels/${channelId}/messages`);
    messagesRef.push({
      objData: {
        type: "text",
        value: text
      },
      userid: user.uid,
      photo: user.uid + ".jpg",
      timestamp: Date.now(),
      pending: false
    });
}

export const startFetchingChannels = () => ({
    type: START_FETCHING_CHANNELS
});

export const startFetchingChannelsMessages = () => ({
    type: START_FETCHING_MESSAGES
});

export const receivedChannels = (channels) => ({
    type: RECEIVED_CHANNELS,
    channels,
});

export const chatMessagesFetch = (channelId) => {
  console.log('ERROR::: chatMessagesFetch ->', channelId);
  return (dispatch) => {
    dispatch(startFetchingChannelsMessages());
    firebase.database().ref(`/channels/${channelId}/messages`)
      .on('value', snapshot => {
        console.log('ERROR::: chatMessagesFetch RESULT ->', snapshot.val());
        dispatch({ type: CHAT_MESSAGES_FETCH_SUCCESS, messages: snapshot.val() });
      });
  };
};

 // method to fetch the channels form the user
 const loadChannelsFirebase = (userId) => {
   console.log('');
   console.log('########## exec method: loadChannelsFirebase() ###############');
   console.log('new ) * loadChannelsFirebase: userId:::', userId);
   // return (dispatch) => {
     const query = firebase.database().ref(`/users/${userId}/channels`).orderByKey();
     query.once('value')
     .then((snapshot) => {
         const channels = snapshot.val();
         forEachChannelsFirebase(channels);
     }).then((snapshot) => {
        // after all process done, dispatch the array to Redux
        //dispatch the list of groups/single chat
        dispatchChannelsToChatList();
        // **** END ****
    });
  // }
 };

/*
 const dispatchChannelsToChatList = () => (dispatch) => {
    console.log('');
      console.log('#############################################################');
      console.log('########## dispatchChannelsToChatList() Called ##############');
      console.log('FINAL ChannelsArr:::', channelsArr);
      console.log('#############################################################');
    console.log('');
    return (dispatch) => {
     dispatch({
        type: RECEIVED_CHANNELS,
        channels: channelsArr
     });
    }
 }
*/

 const getAuthUserId = () => {
    let userId = null;
    const user = firebase.auth().currentUser;
    if (user != null) {
      userId = user.uid;
    }
    return userId;
 }


 // method to get full channel object searching by key on Firebase
 const getChannelDetailsFirebase = (key) => {
   console.log('');
   console.log('########## exec method: getChannelDetailsFirebase() ###############');
   let channelRef = firebase.database().ref('/channels/'+ key);
   channelRef.once('value')
    .then((channel) => {
       let key = channel.key;
       let type = channel.val().type;
       let dataObj = channel.val();

       console.log('new ) * getChannelDetailsFirebase: key:::', key);
       console.log('new ) * getChannelDetailsFirebase: type:::', type);
       console.log('new ) * getChannelDetailsFirebase: dataObj:::', dataObj);

       // if the channel type === single, need to get first_name, last_nameand photo
       if(type === 'single') {
         let members = dataObj.members;
         //look on member list the friend from this logged userId
         Object.keys(members).forEach((memberKey, memberKeyIndex) => {
           if(memberKey !== userId) {
             //take the friend of this channel
            console.log('new ) * getChannelDetailsFirebase: Friend:::', memberKey);
            getFriendDetailsFirebase(memberKey, dataObj);
           }
         });
       } else { // group channel
         //add new goup channel to the list to be dipatched on redux later
         channelsArr.push(dataObj);
       }
       console.log('');
    });
 };

 // method to get full user object searching by key on Firebase
 const getFriendDetailsFirebase = (uid, targetObject) => {
   console.log('########## exec method: getFriendDetailsFirebase() ###############');
   //take the friend of this uid
   let query = firebase.database().ref(`/users/${uid}`).orderByKey();
   query.once("value")
   .then((friend) => {
     let friendKey = friend.key;
     let friendVal = friend.val();

     console.log('new ) *** getFriendDetailsFirebase: myFriend:::', friendVal);

     const { first_name, last_name, photo } = friendVal;

     console.log('new ) *** getFriendDetailsFirebase: first_name:::', first_name);
     console.log('new ) *** getFriendDetailsFirebase: last_name:::', last_name);
     console.log('new ) *** getFriendDetailsFirebase: photo:::', photo);

     // add ne data in the tarhet Object
     // TODO: try to use Object.assing
     targetObject.first_name = first_name;
     targetObject.last_name = last_name;
     targetObject.photo = photo;

     console.log('new ) *** getFriendDetailsFirebase: targetObject:::', targetObject);

     //add new single channel to the list with custom data (first_name, last_name, photo) to be dipatched on redux later
     channelsArr.push(targetObject);

     console.log('new ) *** getFriendDetailsFirebase: channelsArr:::', channelsArr);

   })
   .catch((error) => {
     console.error("Error retrieving friend!", error);
   });
 }

 // method to forEach every channel key received from loadChannelsFirebase()
 // making request on firebase looking for more details about the channel
 const forEachChannelsFirebase = (channels) => {
   console.log('');
   console.log('########## exec method: forEachChannelsFirebase() ###############');
   console.log('new ) * forEachChannelsFirebase: channels:::', channels);
   console.log();

   //get user id from logged user
   userId = getAuthUserId();

   Object.keys(channels).forEach((key) => {
      let isActive = channels[key]; // actual contents of the childs
      console.log('new ) ** forEachChannelsFirebase: channelKey:::', key);
      console.log('new ) ** forEachChannelsFirebase: isActive:::', isActive);
      if (isActive) {
        //make request asking for the specific
        getChannelDetailsFirebase(key);
      }
   });
 };

 export const chatListFetch = (userId) =>
  (dispatch) => {
    //enable the spinner ( preload )
    dispatch(startFetchingChannels());
    //start the query to fetch the user's chat list ( groups and single chats )
    console.log('');
    console.log('########## exec method: loadChannelsFirebase() ###############');
    console.log('new ) * loadChannelsFirebase: userId:::', userId);
    const query = firebase.database().ref(`/users/${userId}/channels`).orderByKey();
    query.once('value')
      .then((snapshot) => {
        const channels = snapshot.val();
        forEachChannelsFirebase(channels);
      }).then((snapshot) => {
        // after all process done, dispatch the array to Redux
        //dispatch the list of groups/single chat
        console.log('');
        console.log('#############################################################');
        console.log('########## dispatchChannelsToChatList() Called ##############');
        console.log('FINAL ChannelsArr:::', channelsArr);
        console.log('#############################################################');
        console.log('');
        dispatch(receivedChannels(channelsArr));
        // **** END ****
      });
  }
