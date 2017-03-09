export const openChat = (id, fullname, photo, lastLogin) => ({
  type: 'open_chat',
  payload: { id, fullname, photo, lastLogin },
});

export const addNewMessage = (type, text) => ({
  type: 'add_new_message',
  payload: { type, text },
});
