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
import { View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

class TopTabBar extends Component {

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.3);
  }

  componentDidMount() {
     this.spring();
  }

  spring() {
    this.springValue.setValue(0.8);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start();
  }

  renderTabBar() {
    const { content, iconStyle } = styles;

    return (
      <View style={content}>
        <View>
          <Icon name="ios-arrow-back" size={30} style={[iconStyle, { marginTop: -5 }]} />
        </View>
        <View>
          <Icon2 name="menu" size={20} style={iconStyle} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        { this.renderTabBar() }
      </View>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  iconStyle: {
    color: '#020201',
    fontWeight: '100'
  }
};

export default TopTabBar;
