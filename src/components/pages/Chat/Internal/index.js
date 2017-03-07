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
         Image,
         TextInput,
         Text,
         StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import ChatList from './Lists/ChatList';

class InternalChat extends Component {

  state = {
    behavior: 'position',
    modalOpen: true,
    chatText: ''
  };

  renderTopBar() {
    const { content, iconToolbarStyle, profileImage, chatTitle, chatSubTitle } = styles;
    const photo = 'https://storage.skydreamer.io/profile/0100110.jpg';
    const chatTitleStr = 'Federico Somaschini';
    const chatSubTitleStr = "I'm busy now!";

    return (
      <View style={content}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon3 name="ios-arrow-back" size={25} style={iconToolbarStyle} />
          <Image source={{ uri: photo }} style={profileImage} />
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', marginLeft: 10, paddingTop: 7, paddingBottom: 7 }}>
            <Text style={chatTitle}>{chatTitleStr}</Text>
            <Text style={chatSubTitle}>{chatSubTitleStr}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon4 name="attachment" size={20} style={iconToolbarStyle} />
          <Icon name="dots-vertical" size={20} style={iconToolbarStyle} />
        </View>
      </View>
    );
  }

  render() {
    const { backgroundImageStyle,
            containerChatList,
            viewInputContainer,
            textInput,
            iconStyle } = styles;

    return (
      <Image
        source={require('../../../../images/chat-bg.jpg')} style={backgroundImageStyle}
      >
        <StatusBar
           backgroundColor="black"
        />

        {this.renderTopBar()}

        <View style={containerChatList}>
          <ChatList />
        </View>

        <View style={viewInputContainer}>
          <TextInput
            placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#AFA3C6' }}
            placeholder="Write a message"
            placeholderTextColor={'#AFA3C6'}
            underlineColorAndroid={'white'}
            style={textInput}
            value={this.state.chatText}
          />
          <Icon name="emoticon-happy" size={25} style={iconStyle} />
          <Icon2 name="send-o" size={25} style={iconStyle} />

        </View>

      </Image>
    );
  }
}


const styles = {
  iconStyle: {
    color: '#A89EC1',
    alignSelf: 'center',
    marginRight: 20,
  },
  content: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    backgroundColor: '#FFF8F6'
  },
  iconToolbarStyle: {
    color: '#A89EC1',
    fontWeight: '100',
    marginLeft: 10,
    marginRight: 5,
    alignSelf: 'center'
  },
  profileImage: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 37,
    height: 37,
    borderRadius: 50,
    marginLeft: 15
  },
  textInput: {
    flex: 1,
    color: '#AFA3C6',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  chatTitle: {
    color: '#D28A89',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Poppins-Medium'
  },
  chatSubTitle: {
    color: '#D28A89',
    textAlign: 'left',
    fontSize: 13,
    fontFamily: 'Poppins-Regular'
  },
  containerChatList: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#F4F3F8',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingRight: 10,
  },
  viewContainer: {
    flex: 1,
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
  },
  backgroundImageStyle: {
    flex: 1,
    width: null,
    height: null
  }
};


export default InternalChat;
