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
import FriendList from './Lists/FriendList';

class Friend extends Component {

  render() {
    const { container } = styles;
    return (
      <View style={container}>
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


export default Friend;
