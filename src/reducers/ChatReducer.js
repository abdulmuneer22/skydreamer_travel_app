// /-----------------------------------------------------------------
// /   Class:          FriendReducer.js
// /   Description:    Render a provisory CHAT JSON list
// /   Author:         Guilherme Borges Bastos       Date: 02/03/2017
// /   Notes:
// /   Revision History:
// /   Name:               Date:           Description:
// /-----------------------------------------------------------------
import { Actions } from 'react-native-router-flux';
import data from './ChatFakeList.json';

const INITIAL_STATE = {
  data,
};

const moment = require('moment');

export default (state = INITIAL_STATE, action) => {
  console.log('@@@@@@@@ ChatReducer @@@@@@@@');
  console.log(action);

  switch (action.type) {
    case 'open_chat':
      const { id, fullname, photo, lastLogin } = action.payload;
      Actions.internalChat({ id, fullname, photo, lastLogin });
      return { ...state, data };
    case 'add_new_message':
      const { text, type } = action.payload;
      var newMessageArr = {
        id: 568,
        text,
        timestemp: moment().unix(),
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
