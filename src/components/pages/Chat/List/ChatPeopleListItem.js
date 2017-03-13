/**
 * @Class:             ChatPeopleListItem.js
 * @Parent:            ChatPeopleList.js
 * @Description:       Render the list of friends from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, removed useless actions
 */
import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chatActions } from '../../../../actions';

const styles = {
  onlineUserSign: {
    backgroundColor: '#51CA31',
    width: 17,
    height: 17,
    borderRadius: 50,
    borderColor: '#FFF8F6',
    borderWidth: 3,
    position: 'absolute',
    right: 9,
    bottom: 9,
  },
  profileImage: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: 7,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconStyle: {
    color: '#A89DC5',
    alignSelf: 'center',
    marginTop: 15,
  },
  nameStyle: {
    fontSize: 17,
    fontFamily: 'NotoSans-Bold',
  },
  placeStyle: {
    fontSize: 13,
    fontFamily: 'NotoSans-light',
  },
  timeStyle: {
    fontSize: 12,
    fontFamily: 'NotoSans-light',
    color: '#787878',
    textAlign: 'right',
    marginRight: 6,
  },
  renderRowOptionsStyle: {
    flex: 0.2,
    justifyContent: 'space-around',
    paddingTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  pendingMessageStyle: {
    fontSize: 11,
    backgroundColor: '#5DC144',
    borderRadius: 50,
    fontFamily: 'NotoSans-light',
    color: '#fff',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: 17,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: '#E3F9F9',
    height: 65,
    backgroundColor: '#FBFCFC',
  },
  rowOptionContainer: {
    flex: 0.533,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#E6DBD9',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    marginRight: 10,
  },
  iconOptionStyle: {
    color: '#A89DC5',
    alignSelf: 'center',
    marginTop: 10,
  },
  iconContainerButLastOne: {
    borderColor: '#ccc',
    borderRightWidth: 1,
  },
};

class ChatPeopleListItem extends Component {

  static propTypes = {
    chat: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    openChat: PropTypes.func,
    selectedFriend: PropTypes.func,
  };

  state = {
    fadeAnim: new Animated.Value(0), // init opacity 0
  }

  componentWillUpdate() {
    // LayoutAnimation.spring();
    Animated.timing(          // Uses easing functions
       this.state.fadeAnim,   // The value to drive
       { toValue: 1, duration: 800 },         // Configuration
     ).start();
  }

  renderMoreOptions() {
    const {
      iconOptionStyle,
      rowOptionContainer,
      iconContainerButLastOne,
    } = styles;

    return (
      this.props.expanded &&
        <Animated.View
          style={{
            flexDirection: 'row',
            flex: 0.533,
            opacity: this.state.fadeAnim }}
        >
          <View style={{ flex: 0.02 }}>
            <Icon3
              name="md-arrow-dropleft"
              size={45}
              style={{ color: '#F0E6E4', marginTop: 8 }}
            />
          </View>
          <View
            style={[
              rowOptionContainer, {
                backgroundColor: '#F0E6E4',
                flex: 0.493,
              },
            ]}
          >
            <View
              style={[{ flex: 0.25 }, iconContainerButLastOne]}
            >
              <Icon
                name="call"
                size={20}
                style={iconOptionStyle}
              />
            </View>
            <View style={[{ flex: 0.25 }, iconContainerButLastOne]}>
              <Icon
                name="chat-bubble-outline"
                size={20}
                style={iconOptionStyle}
              />
            </View>
            <View
              style={[{ flex: 0.25 }, iconContainerButLastOne]}
            >
              <Icon2
                name="location-pin"
                size={20}
                style={iconOptionStyle}
              />
            </View>
            <View style={{ flex: 0.25 }}>
              <Icon2
                name="user-unfollow"
                size={20}
                style={[iconOptionStyle, { color: 'red' }]}
              />
            </View>
          </View>
        </Animated.View>
    );
  }

  renderRowOptions() {
    const { chat, expanded } = this.props;
    const { id } = chat;
    const { timeStyle, pendingMessageStyle, renderRowOptionsStyle } = styles;
    return (
      !expanded &&
        <View style={renderRowOptionsStyle}>
          <Text style={timeStyle}>02:24 PM</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
            {id === 5 &&
              <Icon3 name="md-volume-off" size={20} />
            }
            {id < 5 &&
              <Text style={pendingMessageStyle}>{id + 1}</Text>
            }
          </View>
        </View>
    );
  }

  renderInfoFriend() {
    const {
      chat,
      expanded,
    } = this.props;
    const {
      fullname,
      lastMessage,
    } = chat;
    const {
      nameStyle,
      placeStyle,
    } = styles;
    if (expanded) {
      return (
        <View style={{ flex: 0.266, paddingTop: 10 }}>
          <Text style={nameStyle}>{fullname}</Text>
          <Text style={placeStyle}>{lastMessage}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 0.65, paddingTop: 10 }}>
        <Text style={nameStyle}>{fullname}</Text>
        <Text style={placeStyle}>{lastMessage}</Text>
      </View>
    );
  }

  renderOnlineUserSign() {
    const { id } = this.props.chat;
    const { onlineUserSign } = styles;
    return (
      (id === 0 || id === 1 || id === 3 || id === 5) &&
        <View style={onlineUserSign} />
    );
  }

  render() {
    const {
      container,
      rowContainer,
      profileImage,
    } = styles;
    const {
      chat,
      chatActions,
      selectedFriend,
    } = this.props;
    const { id, fullname, photo, lastLogin } = chat;

    return (
      <TouchableWithoutFeedback
        style={container}
        onPress={() => chatActions.openChat(id, fullname, photo, lastLogin)}
        onLongPress={() => selectedFriend(id)}
      >
        <View>
          <View style={rowContainer}>
            <View style={{ flex: 0.2 }}>
              <Image source={{ uri: photo }} style={profileImage} />
              {this.renderOnlineUserSign()}
            </View>
            {this.renderMoreOptions()}
            {this.renderInfoFriend()}
            {this.renderRowOptions()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedFriendId === ownProps.chat.id;
  return { expanded };
};

const mapDispatchToProps = dispatch => ({
  chatActions: bindActionCreators(chatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPeopleListItem);
