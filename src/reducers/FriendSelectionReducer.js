///-----------------------------------------------------------------
///   Class:          FriendSelectionReducer.js
///   Description:    switch the action connected with Friend reducer
///   Author:         Guilherme Borges Bastos       Date: 15/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:           Description:
///   Guilherme Bastos    27/02/2017      Add action select_friend
///-----------------------------------------------------------------
export default (state = null, action) => {
  //console.log(action);
  switch (action.type) {
    case 'select_friend':
      return action.payload;
    default:
      return state;
  }
};
