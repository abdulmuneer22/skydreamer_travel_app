///-----------------------------------------------------------------
///   Namespace:      Main.js
///   Class:          TopTabBar.js
///   Description:    Render top-bar navigation
///   Author:         Guilherme Borges Bastos       Date: 23/02/2017
///   Notes:
///   Revision History:
///   Name:           Date:        Description:
///-----------------------------------------------------------------
import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

class TopChatBar extends Component {

  render() {
    const { content, iconStyle } = styles;
    return (
      <View style={[content, { padding: 15 }]}>
        <View style={{ flex: 1 }}>
          <Icon name="ios-arrow-back" size={25} style={iconStyle} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="ios-search" size={25} style={[iconStyle, { marginRight: 10 }]} />
          <Icon2 name="menu" size={20} style={iconStyle} />
        </View>
      </View>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 8
  },
  iconStyle: {
    color: '#020201',
    fontWeight: '100'
  }
};

export default TopChatBar;
