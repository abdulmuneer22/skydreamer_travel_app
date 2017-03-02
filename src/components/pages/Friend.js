///-----------------------------------------------------------------
///   Class:          Friend.js
///   Description:    Render FriendList like a react-native Scene
///   Author:         Guilherme Borges Bastos       Date: 27/02/2017
///   Notes:
///   Revision History:
///   Name:           Date:        Description:
///-----------------------------------------------------------------
import React, { Component } from 'react';
import { View } from 'react-native';
import { Searchbar, Input, Spinner} from '.././common';
import FriendList from './Lists/FriendList';
import {connect} from 'react-redux';
import {searchFriends} from '../../actions';

class Friend extends Component {
  onSearch(query){
    this.props.searchFriends(query);
  }
  onClear(query){
    this.props.query='';
  }
  render() {
    const { container, searchBar } = styles;
    return (
      <View style={container}>
        <Searchbar
          placeholder="search"
          onChangeText={this.onSearch.bind(this)}
          onPress={this.onClear.bind(this)}
          value={this.props.query}
        />
        <FriendList />
      </View>
    );
  }

}

const styles = {
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#999'
  },
  container: {
    flex: 1
  }
};

const mapStateToProps = ({ selectedFriendId }) => {
  const {query} = selectedFriendId;
  return { query };
};

export default connect(mapStateToProps, {searchFriends})(Friend);
