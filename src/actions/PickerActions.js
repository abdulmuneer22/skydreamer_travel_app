// /-----------------------------------------------------------------
// /   Class:          PickerAction.js
// /   Description:    Export action about Picker reducer
// /   Author:         Paolo Pirruccio       Date: 24/02/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /-----------------------------------------------------------------
import { CONTACTS_CHECKED, CONTACTS_UNCHECKED, CONTACTS_SELECTED, SEARCH_QUERY, CONTACTS_SEARCH, CONTACTS_LOADED } from './types';

export const contactsLoaded = contact => ({ type: 'CONTACTS_LOADED', payload: contact });

export const contactsChecked = contact => ({ type: 'CONTACTS_CHECKED', payload: contact });

export const contactsUnchecked = contact => ({ type: 'CONTACTS_UNCHECKED', payload: contact });
export const searchQuery = text => ({ type: 'SEARCH_QUERY', payload: text });

export const contactsSearch = contact => ({ type: 'CONTACTS_SEARCH', payload: contact });
export const contactsSelected = () => (dispatch) => {
        // Get data from our server
  console.log('Ok');
};
