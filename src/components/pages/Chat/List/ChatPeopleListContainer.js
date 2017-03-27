/**
 * @Class:             ChatPeopleListContainer.js
 * @Description:       Render the people list from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, slightly refactored
 */
import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import firebase from 'firebase';
import { ListView, View, Text } from 'react-native';
import { Spinner } from '../../../common';
import { connect } from 'react-redux';

import { chatListFetch } from '../../../../actions';
import ChatPeopleList from './ChatPeopleList';

const styles = {
  container: {
    flex: 1,
  },
};

const userId = null;

class ChatPeopleListContainer extends Component {

  constructor(props) {
    super(props);
    console.log("this.props@ChatPeopleListContainer", this.props);
     /*
     var user = firebase.auth().currentUser;
     if (user != null) {
       userId = 'E0GX1LyX9GVv3kjzMgOsOeoKmLC3';//user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
     }
     console.log('chatListFetch UserId:', userId);
     */

     this.props.chatListFetch('E0GX1LyX9GVv3kjzMgOsOeoKmLC3');

 }

  render() {
    const { container } = styles;
    const { isLoading, channels, singleChannels } = this.props;

    console.log('isLoading', isLoading);
    console.log('render() singleChannels:::', singleChannels);

    return (
      <View style={container}>
        <ChatPeopleList
          isLoading={isLoading}
          channels={channels}
          singleChannels={singleChannels}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ chats }) => ({
    channels: chats.channels,
    singleChannels: chats.singleChannels,
    isLoading: chats.isLoading
});

export default connect(mapStateToProps, { chatListFetch })(ChatPeopleListContainer);
