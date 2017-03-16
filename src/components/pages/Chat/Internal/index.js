/**
 * @Class:             Chat.js
 * @Description:       Render Chat Component
 * @Author:            Guilherme Borges Bastos      @Date: 28/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  Removed useless actions, eslint
 * Alberto Schiabel    14/03/2017  refactored actions import
 */
import React, { Component, PropTypes } from 'react';
import { View,
         Image,
         TextInput,
         Text,
         TouchableOpacity,
         StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';

import ChatList from './Lists/ChatList';
import { chatActions } from 'skydreamer/actions';

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
    backgroundColor: '#FFF8F6',
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
    marginLeft: 15,
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
    fontFamily: 'Poppins-Medium',
  },
  chatSubTitle: {
    color: '#D28A89',
    textAlign: 'left',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  containerChatList: {
    flex: 1,
    borderColor: '#F4F3F8',
    flexDirection: 'column',
    marginBottom: 10,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  viewInputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 7,
  },
  fullCointainerStyle: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#FFF8F6',
  },
  placeholderStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#AFA3C6',
  },
};

class InternalChat extends Component {

  static propTypes = {
    chatActions: PropTypes.object.isRequired,
    fullname: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    lastLogin: PropTypes.any.isRequired,
  };

  state = {
    behavior: 'position',
    modalOpen: true,
    text: '',
  };

  onChangeText = (text) => {
    this.setState({ text });
  }

  onSendPressButton = () => {
    const { text } = this.state;
    if (text === '') {
      return;
    }

    // ChatList.addNewMessage(text, ChatList.state);
    const type = 'SelfText';
    this.setState({ text: '' });
    this.props.chatActions.addNewMessage(type, text);
  }

  onBackPressButton = () => {
    // TODO: write the back intent code
  }

  renderTopBar() {
    const {
      content,
      iconToolbarStyle,
      profileImage,
      chatTitle,
      chatSubTitle,
    } = styles;
    // const { id, fullname, photo, lastMessage, lastLogin } = this.props;
    const {
      fullname,
      photo,
      lastLogin,
    } = this.props;
    // TODO: refactor the code to add timezone and Language format
    const dateA = moment(1489068939);
    const dateB = moment(lastLogin);

    const lastLoginStr = dateB.from(dateA);

    return (
      <View style={content}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={this.onBackPressButton}
          >
            <Icon3 name="ios-arrow-back" size={25} style={iconToolbarStyle} />
          </TouchableOpacity>
          <Image source={{ uri: photo }} style={profileImage} />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: 10,
              paddingTop: 10,
              paddingBottom: 10 }}
          >
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
            placeholderStyle={styles.placeholderStyle}
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

const mapStateToProps = (state) => {
  const { text, type } = state;
  return { text, type };
};

const mapDispatchToProps = dispatch => ({
  chatActions: bindActionCreators(chatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InternalChat);
