import React, { Component } from 'react';
import { View } from 'react-native';
import ViewPager from 'react-native-viewpager';
import ChatPeopleList from './List/ChatPeopleList';

class Chat extends Component {

  state = { dataSource: null, currentPage: 0, pages: ['People', 'Groups'] };

  componentWillMount() {
    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.setState({
      dataSource: this.dataSource.cloneWithPages(this.state.pages),
    });
  }

  onChangePage(data) {
    const pagesArr = ['People', 'Groups'];
    console.log('---------- onChangePage -----------');
    console.log(pagesArr[data]);
    console.log(this.props.setCurrentPageTopTabBar);
    console.log(this.props.text);
  }

  setCurrentPage(index) {
    this.viewPagerComponent.goToPage(index, true);
  }

  render() {
    // const parent = this._reactInternalInstance._currentElement._owner._instance;
    const { container } = styles;
    return (
      <View style={container}>
        <ChatPeopleList />
      </View>
    );
  }
}

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


export default Chat;
