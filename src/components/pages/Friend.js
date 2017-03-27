/**
 * @Class:             Friend.js
 * @Description:       Render FriendList like a react-native Scene
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, refactored
 * Alberto Schiabel    14/03/2017  refactored actions and common import
 */
import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Searchbar } from 'skydreamer/common';
import FriendList from './Lists/FriendList';
import { friendActions } from 'skydreamer/actions';

const styles = {
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#999',
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
};

class Friend extends Component {

  static propTypes = {
    friendActions: PropTypes.object.isRequired,
    query: PropTypes.string,
  };

  onSearch = (query) => {
    this.props.friendActions.searchFriends(query);
  }

  onClear = (query) => {
    this.props.query = '';
  }

  render() {
    const {
      container,
      searchBar,
    } = styles;

    return (
      <View style={container}>
        <Searchbar
          placeholder="search"
          onChangeText={this.onSearch}
          onPress={this.onClear}
          value={this.props.query}
        />
        <FriendList />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = dispatch => ({
  friendActions: bindActionCreators(friendActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
