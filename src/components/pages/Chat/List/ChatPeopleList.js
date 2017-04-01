/**
 * @Class:             ChatPeopleList.js
 * @Description:       Render the people list from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, slightly refactored
 * Alberto Schiabel    01/04/2017  refactored to stateless component and
 *                                 replaced ListView with FlatList
 */
import React, { Component, PropTypes } from 'react';
import { FlatList } from 'react-native';
import { Spinner } from '../../../common';

import ChatPeopleListItem from './ChatPeopleListItem';

const ChatPeopleList = ({ isLoading, channels, singleChannels }) => (
  isLoading ?
    <Spinner /> :
    <FlatList
      data={this.props.channels}
      keyExtractor={(_, i) => i}
      renderItem={({ item}) => (
        <ChatPeopleListItem
          channels={item}
          singleChannels={singleChannels}
        />
      )}
    />
);

ChatPeopleList.propTypes = {
  isLoading: PropTypes.bool,
  channels: PropTypes.array,
  singleChannel: PropTypes.object,
};

export default ChatPeopleList;
