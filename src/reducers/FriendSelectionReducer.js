///-----------------------------------------------------------------
///   Class:          FriendSelectionReducer.js
///   Description:    switch the action connected with Friend reducer
///   Author:         Guilherme Borges Bastos       Date: 15/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:           Description:
///   Guilherme Bastos    27/02/2017      Add action select_friend
///-----------------------------------------------------------------

const INITIAL_STATE = {
  query: '',
  results: [],
  searchArray: [],
  loading: false
};
const _ = require('lodash');

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'select_friend':
      return action.payload;
    case 'LOAD_FRIENDS':
      return { ...state, searchArray: action.payload, results: action.payload };
    case 'SEARCH_FRIENDS':
      let searchResults = [];
      const regex = new RegExp(action.payload,'i');
      if(!action.payload){
        searchResults = state.searchArray;
      }
      else{
        searchResults = _.filter(state.searchArray, function (item) {
          return regex.test(item.fullname);
        });
      }
      return { ...state, query: action.payload, results: searchResults };
    default:
      return state;
  }
};
