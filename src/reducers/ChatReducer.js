/**
 * @Class:             ChatReducer.js
 * @Description:       Render a provisory CHAT JSON list
 * @Author:            Guilherme Borges Bastos      @Date: 02/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    14/03/2017  added import types, refactored actions import
 * Guilherme Bastos    16/03/2017  added CHAT_MESSAGES_FETCH_SUCCESS
*/

import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import data from './ChatFakeList.json';

import {
  OPEN_CHAT,
  ADD_NEW_MESSAGE,
  CHAT_LIST_FETCH_SUCCESS,
  CHAT_MESSAGES_FETCH_SUCCESS,
  START_FETCHING_CHANNELS,
  RECEIVED_CHANNELS
} from 'skydreamer/actions/types';

const INITIAL_STATE = {
  data,
  channels: [],
  singleChannels: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_CHANNELS:
      return Object.assign({}, state, {
          isFetching: true
      });
    case CHAT_MESSAGES_FETCH_SUCCESS:
      return action.payload;
    case RECEIVED_CHANNELS:
      console.log('RECEIVED_CHANNELS', action.channels, action.singleChannels);
      return Object.assign({}, state, {
        isFetching: false,
        channels: action.channels,
        singleChannels: action.singleChannels
      });
      //return action.payload; // CHANGE THIS in something like Object.assign({}, state, chats: action.payload);
      // return {chats: action.payload};
    case OPEN_CHAT:
      const { id, fullname, photo, lastLogin } = action.metaInfo;
      Actions.internalChat({ id, fullname, photo, lastLogin });
      return Object.assign({}, ...state, {
        messages: data
      });
    case ADD_NEW_MESSAGE:
      const { text, type } = action.payload;
      const newMessageArr = {
        id: 568,
        text,
        timestamp: moment().unix(),
        type,
        user: {
          userid: 1,
          photoSrc: 'https://storage.skydreamer.io/profile/0100110.jpg',
        },
      };
      data.push(newMessageArr);
      return { ...state, data };
    default:
      return state;
  }
};
