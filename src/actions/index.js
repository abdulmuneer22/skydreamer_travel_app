///-----------------------------------------------------------------
///   Class:          index.js
///   Description:    Merge all actions to export like a package
///   Author:         Guilherme Borges Bastos       Date: 11/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:           Description:
///   Guilherme Bastos    27/02/2017      Added FriendActions
///   Guilherme Bastos    07/03/2017      Added ChatActions
///   Alberto Schiabel    09/03/2017      Added FacebookApiActions
///-----------------------------------------------------------------

import * as facebookApi from './FacebookApiActions';

export * from './AuthActions';
export * from './FriendActions';
export * from './PickerActions';
export * from './ChatActions';
export { facebookApi };

