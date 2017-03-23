import React, { Component } from 'react';
import { View } from 'react-native';
import ViewPager from 'react-native-viewpager';
import ChatPeopleListContainer from './List/ChatPeopleListContainer';

const styles = {
  container: {
    flex: 1,
    marginBottom: 60,
    marginTop: 50,
  },
  viewPager: {
    flex: 1,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#999',
  },
  viewPagerContainer: {
    flex: 1,
  },
};

export default class Chat extends Component {

  constructor(props) {
    super(props);
    console.log('pages/Chat/index.js');
  }

  render() {
    // const parent = this._reactInternalInstance._currentElement._owner._instance;
    const { container } = styles;
    return (
      <View style={container}>
        <ChatPeopleListContainer />
      </View>
    );
  }
}
