///-----------------------------------------------------------------
///   Class:          ContactAction.js
///   Description:    Reducer file for Contact Action
///   Author:         Paolo Pirruccio       Date: 24/02/2017
///   Notes:
///   Revision History:
///   Name:           Date:        Description:
///-----------------------------------------------------------------

const INITIAL_STATE = {
  query: null,
  contacts: [],
  searchResults: []
}


export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'CONTACTS_CHECKED':
      var id = action.payload.recordID;
      return { ...state.contacts[id], selected: true };
    case 'CONTACTS_UNCHECKED':
      var id = action.payload.recordID;
      return { ...state.contacts[id], selected: false };
    case 'CONTACTS_SELECTED':
      return { ...state, contacts: action.payload };
    case 'SEARCH_QUERY':
      return { ...state, query: action.payload };
    case 'CONTACTS_LOADED':
      return { ...state, contacts: action.payload };
    case 'CONTACTS_SEARCH':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
}
