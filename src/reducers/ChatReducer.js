/**
 * @Class:             ChatReducer.js
 * @Description:       Render a provisory CHAT JSON list
 * @Author:            Guilherme Borges Bastos      @Date: 02/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    14/03/2017  added import types, refactored actions import
*/

import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import {
  OPEN_CHAT,
  CHAT_LIST_FETCH_SUCCESS,
  START_FETCHING_CHANNELS,
  RECEIVED_CHANNELS
} from 'skydreamer/actions/types';

const INITIAL_STATE = {
  channels: [],
  singleChannels: [],
  isLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_CHANNELS:
      return Object.assign({}, state, {
          isLoading: true
      });
    case RECEIVED_CHANNELS:
      console.log('RECEIVED_CHANNELS', action.channels, action.singleChannels);
      return Object.assign({}, state, {
        isLoading: false,
        channels: action.channels,
        singleChannels: action.singleChannels
      });
      //return action.payload; // CHANGE THIS in something like Object.assign({}, state, chats: action.payload);
      // return {chats: action.payload};
    case OPEN_CHAT:
      const { id, fullname, photo, lastLogin } = action.metaInfo;
      Actions.internalChat({ id, fullname, photo, lastLogin });
      return Object.assign({}, ...state, {
        isLoading: false
      });
    default:
      return state;
  }
};
