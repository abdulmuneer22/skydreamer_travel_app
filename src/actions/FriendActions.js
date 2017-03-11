// /-----------------------------------------------------------------
// /   Class:          FriendActions.js
// /   Description:    Export all actions about Friend reducer
// /   Author:         Guilherme Borges Bastos       Date: 27/02/2017
// /   Notes:
// /   Revision History:
// /   Name:               Date:           Description:
// /   Alberto Schiabel    10/03/2017      Imported types instead of using them statically
// /-----------------------------------------------------------------
import {
  SELECT_FRIEND,
  SEARCH_FRIENDS,
  LOAD_FRIENDS,
} from './types';

export const selectedFriend = friendId => ({
  type: SELECT_FRIEND,
  payload: friendId,
});

export const searchFriends = query => ({ type: SEARCH_FRIENDS, payload: query });

export const loadFriends = friends => ({ type: LOAD_FRIENDS, payload: friends });
