import {
  OPEN_CHAT,
  ADD_NEW_MESSAGE
} from './types';

export const openChat = (id, fullname, photo, lastLogin) => ({
  type: OPEN_CHAT,
  payload: { id, fullname, photo, lastLogin },
});

export const addNewMessage = (type, text) => ({
  type: ADD_NEW_MESSAGE,
  payload: { type, text },
});
