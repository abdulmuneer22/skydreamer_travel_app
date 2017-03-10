// /-----------------------------------------------------------------
// /   Class:          FriendList.js
// /   Description:    Render the list from Redux
// /   Author:         Guilherme Borges Bastos       Date: 27/02/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /-----------------------------------------------------------------
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import FriendListItem from './FriendListItem';
import { loadFriends } from '../../../actions';

class FriendList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.props.loadFriends(this.props.friends);
    this.dataSource = ds.cloneWithRows(this.props.friends);
  }

  componentWillUpdate() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.friends);
    // this.dataSource = ds.cloneWithRows(this.props.results);
  }

  renderRow(library) {
    return <FriendListItem library={library} />;
  }


  render() {
    const { container } = styles;
    if (this.props.results === 0) {
      return (
        <View style={container}>
          <Text> No contacts found</Text>
        </View>
      );
    }

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

const mapStateToProps = (state) => {
  console.log(state);
  return { friends: state.friends, results: state.selectedFriendId.results };
};

export default connect(mapStateToProps, { loadFriends })(FriendList);
