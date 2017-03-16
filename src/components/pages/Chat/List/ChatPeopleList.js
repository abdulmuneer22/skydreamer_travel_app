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
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { chatListFetch } from '../../../../actions';
import ChatPeopleListItem from './ChatPeopleListItem';

const styles = {
  container: {
    flex: 1,
  },
};

//FAKE userId
const userId = 1;

class ChatPeopleList extends Component {

  componentWillMount() {
    this.props.chatListFetch(userId);
    console.log('####### componentWillMount chatListFetch() #############');
    console.log(this.props);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  createDataSource({ chats }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(chats);
  }

  renderRow = chat => (
    <ChatPeopleListItem chat={chat} />
  );

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <ListView
          enableEmptySections
          style={container}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}


const mapStateToProps = state => {
  const chats = state.chats;
  return { chats };
};

export default connect(mapStateToProps, { chatListFetch })(ChatPeopleList);
