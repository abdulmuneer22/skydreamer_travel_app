// /-----------------------------------------------------------------
// /   Class:          FriendSelectionReducer.js
// /   Description:    switch the action connected with Friend reducer
// /   Author:         Guilherme Borges Bastos       Date: 15/02/2017
// /   Notes:
// /   Revision History:
// /   Name:               Date:           Description:
// /   Guilherme Bastos    27/02/2017      Add action select_friend
// /   Alberto Schiabel    10/03/2017      Imported types instead of using them
// /                                       statically, removed useless lodash
// /-----------------------------------------------------------------
import {
  SELECT_FRIEND,
  SEARCH_FRIENDS,
  LOAD_FRIENDS,
} from '../actions/types';

const INITIAL_STATE = {
  query: '',
  results: [],
  searchArray: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_FRIEND:
      return action.payload;
    case SEARCH_FRIENDS:
      let searchResults = [];
      const regex = new RegExp(action.payload, 'i');
      if (!action.payload) {
        searchResults = state.searchArray;
      } else {
        searchResults = state.searchArray.filter(item => regex.test(item.fullname));
      }
      return { ...state, query: action.payload, results: searchResults };
    case LOAD_FRIENDS:
      return { ...state, searchArray: action.payload, results: action.payload };
    default:
      return state;
  }
};
