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
import { ListView, View } from 'react-native';
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
    this.createDataSource(this.props.chats);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ chats }) {
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

// CHANGE THIS ONE
const mapStateToProps = state => {

  console.log('**** mapStateToProps ChatPeopleList() ****');
  console.log(state.chats);

  return { chats: state.chats };
};

export default connect(mapStateToProps, { chatListFetch })(ChatPeopleList);
