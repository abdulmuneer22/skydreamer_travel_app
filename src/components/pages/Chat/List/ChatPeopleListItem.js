/**
 * @Class:             ChatPeopleListItem.js
 * @Parent:            ChatPeopleList.js
 * @Description:       Render the list of friends from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, removed useless actions
 * Alberto Schiabel    14/03/2017  refactored actions import
 */
import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chatActions } from 'skydreamer/actions';

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
    bottom: 9
  },
  profileImage: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: 7,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  iconStyle: {
    color: '#A89DC5',
    alignSelf: 'center',
    marginTop: 15
  },
  nameStyle: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular'
  },
  placeStyle: {
    fontSize: 13,
    fontFamily: 'Poppins-light'
  },
  timeStyle: {
    fontSize: 12,
    fontFamily: 'Poppins-light',
    color: '#FF6D00',
    textAlign: 'right',
    marginRight: 6
  },
  renderRowOptionsStyle: {
    flex: 0.15,
    justifyContent: 'space-around',
    paddingTop: 5,
    marginBottom: 5,
    marginRight: 10
  },
  pendingMessageStyle: {
    fontSize: 13,
    backgroundColor: '#FF6D00',
    borderRadius: 50,
    fontFamily: 'Poppins-light',
    color: '#fff',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: '#E3F9F9',
    height: 65,
    backgroundColor: '#FBFCFC'
  },
  rowOptionContainer: {
    flex: 0.533,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#E6DBD9',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    marginRight: 10
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
    channels: PropTypes.object.isRequired,
    singleChannels: PropTypes.array.isRequired,
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

  renderRowOptions() {
    const { type } = this.props.channels;
    const { timeStyle, pendingMessageStyle, renderRowOptionsStyle } = styles;
    const expanded = false;

    // var number = '10';
    var number = Math.floor((Math.random() * 8));

    return (
      !expanded &&
        <View style={renderRowOptionsStyle}>
          <Text style={timeStyle}>02:24 PM</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
            {type === 'group' &&
              <Icon3 name="md-volume-off" size={20} />
            }
            {type === 'single' &&
              <Text style={pendingMessageStyle}>{number}</Text>
            }
          </View>
        </View>
    );
  }

  /*
  created_at: 1490117516
  group_description: ""
  group_name: ""
  members: Object
  num_of_users: 2
  status: "active"
  type: "single"
  */
  renderInfoFriend() {

    const { nameStyle, placeStyle } = styles;

    const { photo, type } = this.props.channels;

    var title = '';
    var subTitle = '';

    // console.log('photo', photo);
    if (type === 'single') {
      const { last_name, first_name } = this.props.channels;
      title = first_name + ' - ' + last_name;
      subTitle = 'Firebase live database working...';
    } else {
      const { group_name, group_description } = this.props.channels;
      title = group_name;
      subTitle = group_description;
    }

    const expanded = false;

    if (expanded) {
      return (
        <View style={{ flex: 0.266, paddingTop: 10 }}>
          <Text style={nameStyle}>{title}</Text>
          <Text style={placeStyle}>{subTitle}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 0.65, paddingTop: 10 }}>
        <Text style={nameStyle}>{title}</Text>
        <Text style={placeStyle}>{subTitle}</Text>
      </View>
    );
  }

  renderOnlineUserSign() {
    const { type } = this.props.channels;
    const { onlineUserSign } = styles;
    return (
      (type === 'group') &&
        <View style={onlineUserSign} />
    );
  }

  render() {
    const { container, rowContainer, profileImage } = styles;
    const { chatActions, selectedFriend } = this.props;
    const { photo, type, first_name, last_name } = this.props.channels;

    var title = '';
    var folder = '';

    if (type === 'single') {
      folder = 'profile/';
      console.log('this.props.channels', this.props.channels);
      console.log('first_name', first_name);
      console.log('last_name', last_name);
      console.log('');
      // title = friend.first_name  + ' ' + friend.last_name;
      title = '';
    } else {
      const { group_name } = this.props.channels;
      folder = 'groups/';
      title = group_name;
    }

    //FAKE
    const lastLogin = 1489692626;

    return (
      <TouchableWithoutFeedback
        style={container}
        onPress={() => chatActions.openChat(null, title, photo, lastLogin)}
        onLongPress={() => selectedFriend(null)}
      >
        <View>
          <View style={rowContainer}>
            <View style={{ flex: 0.2 }}>
              <Image source={{ uri: 'https://storage.skydreamer.io/' + folder + photo }} style={profileImage} />
              {this.renderOnlineUserSign()}
            </View>
            {this.renderInfoFriend()}
            {this.renderRowOptions()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  chatActions: bindActionCreators(chatActions, dispatch),
});

export default connect(null, mapDispatchToProps)(ChatPeopleListItem);
