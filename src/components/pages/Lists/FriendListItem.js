/**
 * @Class:             FriendListItem.js
 * @Parent:            FriendList.js
 * @Description:       Render FriendList row layout
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  eslint, refactored
 * Alberto Schiabel    14/03/2017  refactored actions import
 */
import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';

import * as actions from 'skydreamer/actions';

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F0E6E4',
    height: 65,
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
};

class FriendListItem extends Component {

  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    library: PropTypes.object.isRequired,
    selectedFriend: PropTypes.func.isRequired,
  };

  state = {
    fadeAnim: new Animated.Value(0), // init opacity 0
  };

  componentWillUpdate() {
    // LayoutAnimation.spring();
    Animated.timing(          // Uses easing functions
       this.state.fadeAnim,   // The value to drive
       { toValue: 1, duration: 800 },         // Configuration
     ).start();
  }

  renderMoreOptions = () => {
    const { expanded } = this.props;
    const { iconOptionStyle, rowOptionContainer } = styles;

    return (
      expanded &&
        <Animated.View style={{ flexDirection: 'row', flex: 0.533, opacity: this.state.fadeAnim }}>
          <View style={{ flex: 0.02 }}>
            <Icon3 name="md-arrow-dropleft" size={45} style={{ color: '#F0E6E4', marginTop: 8 }} />
          </View>
          <View style={[rowOptionContainer, { backgroundColor: '#F0E6E4', flex: 0.493 }]}>
            <View style={{ flex: 0.25, borderColor: '#ccc', borderRightWidth: 1 }}>
              <Icon
                name="call"
                size={20}
                style={iconOptionStyle}
              />
            </View>
            <View style={{ flex: 0.25, borderColor: '#ccc', borderRightWidth: 1 }}>
              <Icon
                name="chat-bubble-outline"
                size={20}
                style={iconOptionStyle}
              />
            </View>
            <View style={{ flex: 0.25, borderColor: '#ccc', borderRightWidth: 1 }}>
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

  renderArrowMoreOptions= () => {
    const { expanded } = this.props;
    const { iconStyle } = styles;
    return (
      !expanded &&
        <View style={{ flex: 0.15 }}>
          <Icon
            name="keyboard-arrow-down"
            size={30}
            style={iconStyle}
          />
        </View>
    );
  }

  renderInfoFriend = () => {
    const {
      library,
      expanded,
    } = this.props;
    const {
      fullname,
      lastMessage,
    } = library;
    const {
      nameStyle,
      placeStyle,
    } = styles;

    return (
      expanded ?
        <View style={{ flex: 0.266, paddingTop: 10 }}>
          <Text style={nameStyle}>{fullname}</Text>
          <Text style={placeStyle}>{lastMessage}</Text>
        </View> :
        <View style={{ flex: 0.65, paddingTop: 10 }}>
          <Text style={nameStyle}>{fullname}</Text>
          <Text style={placeStyle}>{lastMessage}</Text>
        </View>
    );
  }

  renderOnlineUserSign = () => {
    const { id } = this.props.library;
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
      id,
      photo,
    } = this.props.library;

    return (
      <TouchableWithoutFeedback
        style={container}
        onPress={() => this.props.selectedFriend(id)}
      >
        <View>
          <View style={rowContainer}>
            <View style={{ flex: 0.2 }}>
              <Image source={{ uri: photo }} style={profileImage} />
              {this.renderOnlineUserSign()}
            </View>
            {this.renderMoreOptions()}
            {this.renderInfoFriend()}
            {this.renderArrowMoreOptions()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // todo: refactor aqui
  const expanded = state.selectedFriendId === ownProps.library.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(FriendListItem);
