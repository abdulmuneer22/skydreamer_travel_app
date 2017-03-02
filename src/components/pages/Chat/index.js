///-----------------------------------------------------------------
///   Class:          Chat.js
///   Description:    Render Chat Component
///   Author:         Guilherme Borges Bastos       Date: 28/02/2017
///   Notes:
///   Revision History:
///   Name:           Date:        Description:
///-----------------------------------------------------------------
import React, { Component } from 'react';
import { Text,
          View,
          TextInput,
          KeyboardAvoidingView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import HolderDateSeparator from './ViewHolder/HolderDateSeparator';
import HolderOtherText from './ViewHolder/HolderOtherText';
import HolderSelfText from './ViewHolder/HolderSelfText';

class Chat extends Component {

  state = {
    behavior: 'position',
    modalOpen: true,
    chatText: 'Hello, SkyDreamer team!'
  };

  render() {
    return (
        <KeyboardAvoidingView
          style={styles.viewContainer}
           behavior="padding"
        >
          <View style={styles.containerChatList}>
            <HolderDateSeparator timestamp="12:30 PM" />
            <HolderOtherText
              id={1}
              photoSrc="https://storage.skydreamer.io/profile/848fds5155.jpg"
              timestamp="12:30 PM"
              text="Hello, Federico!"
            />

            <HolderDateSeparator timestamp="2:24 PM" />
            <HolderOtherText
              id={10}
              photoSrc="https://storage.skydreamer.io/profile/54564698.jpg"
              timestamp="12:30 PM"
              text="Is he online?"
            />

          <HolderDateSeparator timestamp="3:02 PM" />
          <HolderSelfText
            id={1}
            photoSrc="https://storage.skydreamer.io/profile/0100110.jpg"
            timestamp="12:30 PM"
            text="Yes I'm. I was busy."
          />
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
    justifyContent: 'flex-start',
    alignItems: 'center'
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
