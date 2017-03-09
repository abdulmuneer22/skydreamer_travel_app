// /-----------------------------------------------------------------
// /   Class:          FriendActions.js
// /   Description:    Export all actions about Friend reducer
// /   Author:         Guilherme Borges Bastos       Date: 27/02/2017
// /   Notes:
// /   Revision History:
// /   Name:               Date:           Description:
// /-----------------------------------------------------------------
import { SEARCH_FRIENDS, LOAD_FRIENDS } from './types';

export const selectedFriend = friendId => ({
  type: 'select_friend',
  payload: friendId,
});

export const searchFriends = query => ({ type: 'SEARCH_FRIENDS', payload: query });

export const loadFriends = friends => ({ type: 'LOAD_FRIENDS', payload: friends });
