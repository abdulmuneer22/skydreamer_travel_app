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
import TopChatBar from './pages/Chat/TopChatBar';


class TopTabBar extends Component {

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.3);
  }

  state = { currentPage: 0, pages: ['Flight', 'Compass', 'Cards', 'Chat', 'User'] };

  componentDidMount() {
     this.spring();
  }

  componentDidUpdate() {
    console.log('########### componentDidUpdate #############');
    this.getCurrentMainPage();
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

  getCurrentMainPage = () => {
    const { currentPage } = this.state;
    console.log('getCurrentMainPage:', currentPage);
  }

  renderContainer() {
    const { currentPage } = this.state;
    const { content, iconStyle } = styles;

    if (Number(currentPage) === 3) {
      //Top Chat Bar
      return (
        <TopChatBar />
      );
    }
    //default
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
        { this.renderContainer() }
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

export default TopTabBar;
