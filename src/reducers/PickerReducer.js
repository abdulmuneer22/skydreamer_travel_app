/**
 * @Class:             PickerReducer.js
 * @Description:       Reducer file for Contact Action
 * @Author:            Paolo Pirruccio             @Date: 21/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    10/03/2017  Imported types instead of using
 *                                 them statically, removed useless consts
 */
import {
  CONTACTS_CHECKED,
  CONTACTS_UNCHECKED,
  CONTACTS_SELECTED,
  SEARCH_QUERY,
  CONTACTS_SEARCH,
  CONTACTS_LOADED,
} from '../actions/types';

const INITIAL_STATE = {
  query: null,
  contacts: [],
  searchResults: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case CONTACTS_CHECKED:
      return { ...state.contacts[action.payload.recordID], selected: true };
    case CONTACTS_UNCHECKED:
      return { ...state.contacts[action.payload.recordID], selected: false };
    case CONTACTS_SELECTED:
      return { ...state, contacts: action.payload };
    case SEARCH_QUERY:
      return { ...state, query: action.payload };
    case CONTACTS_SEARCH:
      return { ...state, searchResults: action.payload };
    case CONTACTS_LOADED:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};
