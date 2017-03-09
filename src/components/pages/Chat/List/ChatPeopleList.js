// /-----------------------------------------------------------------
// /   Class:          FriendList.js
// /   Description:    Render the list from Redux
// /   Author:         Guilherme Borges Bastos       Date: 27/02/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /-----------------------------------------------------------------
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ChatPeopleListItem from './ChatPeopleListItem';

class ChatPeopleList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(this.props.friends);
  }

  renderRow(friend) {
    return <ChatPeopleListItem chat={friend} />;
  }

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <ListView
          style={container}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

}

const styles = {
  container: {
    flex: 1,
  },
};

const mapStateToProps = state => ({ friends: state.friends });

export default connect(mapStateToProps)(ChatPeopleList);
