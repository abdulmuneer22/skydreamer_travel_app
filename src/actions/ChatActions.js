export const openChat = (id, fullname, photo, lastLogin) => {
  return {
    type: 'open_chat',
    payload: { id, fullname, photo, lastLogin }
  };
};

export const addNewMessage = (type, text) => {
  return {
    type: 'add_new_message',
    payload: { type, text }
  };
};
