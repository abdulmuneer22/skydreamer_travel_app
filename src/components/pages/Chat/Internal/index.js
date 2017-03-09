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
         TouchableOpacity,
         StatusBar } from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import ChatList from './Lists/ChatList';
import * as actions from '../../../../actions';

const moment = require('moment');

class InternalChat extends Component {
  state = {
    behavior: 'position',
    modalOpen: true,
    text: ''
  };

  onChangeText = (text) => {
    this.setState({ text });
  }

  onSendPressButton = () => {
    var text = this.state.text;
    var type = 'SelfText';
    //ChatList.addNewMessage(text, ChatList.state);
    this.props.addNewMessage(type, text);
  }

  renderTopBar() {
    const { content, iconToolbarStyle, profileImage, chatTitle, chatSubTitle } = styles;
    // const { id, fullname, photo, lastMessage, lastLogin } = this.props;
    const { fullname, photo, lastLogin } = this.props;
    //TODO: refactor the code to add timezone and Language format
    var dateA = moment(1489068939);
    var dateB = moment(lastLogin);

    var lastLoginStr = dateB.from(dateA);

    return (
      <View style={content}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <Icon3 name="ios-arrow-back" size={25} style={iconToolbarStyle} />
          </TouchableOpacity>
          <Image source={{ uri: photo }} style={profileImage} />
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
            <Text style={chatTitle}>{fullname}</Text>
            <Text style={chatSubTitle}>{lastLoginStr}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <Icon4 name="attachment" size={20} style={iconToolbarStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <Icon
              name="dots-vertical"
              size={20}
              style={iconToolbarStyle}
              onPress={this.onSendPressButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { fullCointainerStyle,
            containerChatList,
            viewInputContainer,
            textInput,
            iconStyle } = styles;

    return (
      <View style={fullCointainerStyle}>
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
            onChangeText={this.onChangeText}
            style={textInput}
            multiline
            value={this.state.text}
          />
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <Icon name="emoticon-happy" size={25} style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={this.onSendPressButton}
          >
            <Icon2
              name="send-o"
              size={25}
              style={iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = {
  iconStyle: {
    color: '#A89EC1',
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  content: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    backgroundColor: '#FFF8F6'
  },
  iconToolbarStyle: {
    color: '#A89EC1',
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  profileImage: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 45,
    height: 45,
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
    borderColor: '#F4F3F8',
    flexDirection: 'column',
    marginBottom: 10
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  viewInputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 7
  },
  fullCointainerStyle: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#FFF8F6'
  }
};


const mapStateToProps = (state) => {
  console.log('mapStateToProps of InternalChat.js');
  console.log(state);

  const { text, type } = state;
  return { text, type };
};

export default connect(mapStateToProps, actions)(InternalChat);
