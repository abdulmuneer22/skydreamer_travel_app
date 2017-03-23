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
import { ListView } from 'react-native';
import { Spinner } from '../../../common';
import { connect } from 'react-redux';

import { chatListFetch } from '../../../../actions';
import ChatPeopleListItem from './ChatPeopleListItem';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ChatPeopleList extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    channels: PropTypes.array,
    singleChannel: PropTypes.object,
  };

  constructor(props) {
     super(props);
     this.dataSource = ds.cloneWithRows(props.channels);
     console.log('props@ChatPeopleList', props);
     console.log('props@ChatPeopleList str', JSON.stringify(props, null, 2));
  }

  renderRow(channel, sectionID, rowID, singleChannels) {
    console.log('arguments@renderRow', arguments);
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

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    console.log("nextProps str", JSON.stringify(nextProps, null, 2));
    this.dataSource = ds.cloneWithRows(nextProps.channels);
  }

  render() {
    const { isLoading, channels, singleChannels } = this.props;

    console.log('isLoading', isLoading);
    console.log('render() singleChannels:::', singleChannels);

    if(isLoading || isLoading === null) {
      return (
        <Spinner />
      );
    } else {
      return (
        <ListView
          enableEmptySections
          style={{flex: 1}}
          dataSource={this.dataSource}
          renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID, singleChannels)}
        />
      );
    }
  }
}
