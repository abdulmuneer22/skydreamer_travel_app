///-----------------------------------------------------------------
///   Class:          FriendActions.js
///   Description:    Export all actions about Friend reducer
///   Author:         Guilherme Borges Bastos       Date: 27/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:           Description:
///-----------------------------------------------------------------
export const selectedFriend = (friendId) => {
  return {
    type: 'select_friend',
    payload: friendId
  };
};
