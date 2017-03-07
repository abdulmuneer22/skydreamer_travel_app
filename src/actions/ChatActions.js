import { Actions } from 'react-native-router-flux';

export const openChat = (friendId) => {
  Actions.internalChat();
  return {
    type: 'open_chat',
    payload: friendId
  };
};
