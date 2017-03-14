/**
 * @Class:             FriendList.js
 * @Parent:            Friend.js
 * @Description:       Render the list of friends from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  eslint, refactored
 * Alberto Schiabel    14/03/2017  refactored actions import
 */
import React, { Component, PropTypes } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import FriendListItem from './FriendListItem';

import { loadFriends } from 'skydreamer/actions';

const styles = {
  container: {
    flex: 1,
  },
};

class FriendList extends Component {

  static propTypes = {
    loadFriends: PropTypes.func,
    friends: PropTypes.array,
    results: PropTypes.any,
  };

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

  render() {
    const { container } = styles;

    return (
      <View style={container}>
        {
          this.props.results === 0 ?

            <Text> No contacts found</Text> :

            <ListView
              style={container}
              dataSource={this.dataSource}
              renderRow={library =>
                <FriendListItem library={library} />
              }
            />
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { friends: state.friends, results: state.selectedFriendId.results };
};

export default connect(mapStateToProps, { loadFriends })(FriendList);
