/**
 * @Class:             ChatReducer.js
 * @Description:       Render a provisory CHAT JSON list
 * @Author:            Guilherme Borges Bastos      @Date: 27/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
*/

import { Actions } from 'react-native-router-flux';
import moment from 'moment';
// import data from './ChatFakeList.json';

import {
  ADD_NEW_MESSAGE,
  CHAT_MESSAGES_FETCH_SUCCESS,
  START_FETCHING_MESSAGES
} from 'skydreamer/actions/types';

const INITIAL_STATE = {
  messages: [],
  isLoadingMessages: true,
};

export default (state = INITIAL_STATE, action) => {
  console.log('ERROR::: 2 ', action);
  switch (action.type) {
    case START_FETCHING_MESSAGES:
      return Object.assign({}, state, {
          isLoadingMessages: true
      });
    case CHAT_MESSAGES_FETCH_SUCCESS:
      console.log('CHAT_MESSAGES_FETCH_SUCCESS', action.messages);
      return Object.assign({}, state, {
        isLoadingMessages: false,
        messages: action.messages
      });
    case ADD_NEW_MESSAGE:
      const { text, type } = action.message;
      console.log('addNewMessage: ADD_NEW_MESSAGE', type, text);
      /*
      //@TODO: refactor the object to the new version
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
      messages.push(newMessageArr);
      console.log('addNewMessage: ADD_NEW_MESSAGE DATA:', data);
      */
      return { ...state };
    default:
      return state;
  }
};
