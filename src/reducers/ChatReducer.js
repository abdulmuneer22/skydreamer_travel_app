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
import data from './ChatFakeList.json';

import {
  OPEN_CHAT,
  ADD_NEW_MESSAGE
} from 'skydreamer/actions/types';

const INITIAL_STATE = {
  data,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_CHAT:
      const { id, fullname, photo, lastLogin } = action.payload;
      Actions.internalChat({ id, fullname, photo, lastLogin });
      return { ...state, data };
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
