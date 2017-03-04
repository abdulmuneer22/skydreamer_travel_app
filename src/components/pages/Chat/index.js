///-----------------------------------------------------------------
///   Class:          Chat.js
///   Description:    Render Chat Component
///   Author:         Guilherme Borges Bastos       Date: 28/02/2017
///   Notes:
///   Revision History:
///   Name:           Date:        Description:
///-----------------------------------------------------------------
import React, { Component } from 'react';
import { View,
         TextInput,
         KeyboardAvoidingView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import ChatList from './Lists/ChatList';

class Chat extends Component {

  state = {
    behavior: 'position',
    modalOpen: true,
    chatText: ''
  };

  render() {
    return (
        <KeyboardAvoidingView
          style={styles.viewContainer}
           behavior="padding"
        >
          <View style={styles.containerChatList}>
            <ChatList />
          </View>

          <View style={styles.viewInputContainer}>
            <TextInput
              placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#AFA3C6' }}
              placeholder="Write a message"
              placeholderTextColor={'#AFA3C6'}
              underlineColorAndroid={'white'}
              style={styles.textInput}
              value={this.state.chatText}
            />
            <Icon name="emoticon-happy" size={25} style={styles.iconStyle} />
            <Icon2 name="send-o" size={25} style={styles.iconStyle} />
          </View>
        </KeyboardAvoidingView>
    );
  }
}


const styles = {
  iconStyle: {
    color: '#A89DC5',
    alignSelf: 'center',
    marginRight: 20,
  },
  textInput: {
    color: '#AFA3C6',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    flex: 1
  },
  containerChatList: {
    borderTopWidth: 1,
    borderColor: '#F4F3F8',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  viewContainer: {
    flex: 1,
    marginBottom: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  viewInputContainer: {
    borderBottomWidth: 2,
    borderColor: '#F4F3F8',
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 7,
    height: 60
  }
};


export default Chat;
