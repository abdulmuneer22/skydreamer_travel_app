/**
 * @Class:             ChatPeopleList.js
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
import ChatPeopleListItem from './ChatPeopleListItem';

const styles = {
  container: {
    flex: 1,
  },
};

const userId = null;

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class ChatPeopleList extends Component {

  constructor() {
     super();
     var user = firebase.auth().currentUser;
     if (user != null) {
       userId = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
     }
     console.log('chatListFetch UserId:', userId);
 }

  componentWillMount() {
    this.props.chatListFetch(userId);
    this.createDataSource(this.props.channels);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ channels }) {
    if(channels) {
      this.dataSource = ds.cloneWithRows(channels);
    }
  }

  renderRow(channel, sectionID, rowID, singleChannels) {
    /*
    console.log('####### renderRow ########');
    console.log('channel', channel);
    console.log('sectionID', sectionID);
    console.log('rowID', rowID);
    console.log('singleChannels', singleChannels);
    console.log('');
    console.log('');
    const { type, members, photo } = channel;
    console.log('members>', members);
    console.log('photo>', photo);
    if (type === 'single') {
      var friendKey = null;
      var singleChannel = null;
      Object.keys(members).forEach(function(key) {
          if(key !== userId) {
            friendKey = key;
          }
      });
      console.log('Object.keys(): friendKey:', friendKey);
      singleChannel = singleChannels.friendKey;
    }
    console.log('singleChannel:::', singleChannel, friendKey);
    */
    return <ChatPeopleListItem channels={channel} singleChannels={singleChannels} />
  };

  render() {
    const { container } = styles;
    const { isFetching, channels, singleChannels } = this.props;

    console.log('isFetching', isFetching);
    console.log('render() channels:::', channels);
    if (channels === undefined) {
      return (
        <View style={container}>
          <Spinner />
        </View>
      );
    }

    if(isFetching === true) {
      return (
        <View style={container}>
          <Spinner />
        </View>
      );
    }
    if(channels.length > 0) {
      return (
        <View style={container}>
          <ListView
            enableEmptySections
            style={container}
            dataSource={this.dataSource}
            renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID, singleChannels)}
          />
        </View>
      );
    }

    return (
      <View style={container} />
    );

  }
}

const mapStateToProps = (state) => ({
    channels: state.chats.channels,
    singleChannels: state.chats.singleChannels,
    isFetching: state.chats.isFetching
});

export default connect(mapStateToProps, { chatListFetch })(ChatPeopleList);
