// /-----------------------------------------------------------------
// /   Class:          Friend.js
// /   Description:    Render FriendList like a react-native Scene
// /   Author:         Guilherme Borges Bastos       Date: 15/02/2017
// /   Notes:
// /   Revision History:
// /   Name:               Date:           Description:
// /   Guilherme Bastos    27/02/2017      Add FriendSelectionReducer and FriendReducer
// /   Guilherme Bastos    02/03/2017      Add ChatReducer
// /   Guilherme Bastos    27/03/2017      Add ChatInternalReducer
// /-----------------------------------------------------------------
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FriendSelectionReducer from './FriendSelectionReducer';
import FriendReducer from './FriendReducer';
import ChatReducer from './ChatReducer';
import FacebookApiReducer from './FacebookApiReducer';
import ChatInternalReducer from './ChatInternalReducer';

export default combineReducers({
  auth: AuthReducer,
  selectedFriendId: FriendSelectionReducer,
  friends: FriendReducer,
  chats: ChatReducer,
  internalChats: ChatInternalReducer,
  facebook: FacebookApiReducer,
});
