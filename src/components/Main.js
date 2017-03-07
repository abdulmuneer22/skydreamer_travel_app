///-----------------------------------------------------------------
///   Namespace:      Router.js
///   Class:          Main.js
///   Description:    Render Main Page ( View Pager, BottomTabBar & TopTabBar )
///   Author:         Guilherme Borges Bastos       Date: 23/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:         Description:
///   Guilherme Bastos    28/02/2017    Added Chat Page
///-----------------------------------------------------------------
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import ViewPager from 'react-native-viewpager';
import BottomTabBar from './BottomTabBar';
import TopTabBar from './TopTabBar';

//----------- PAGES COMPONENT --------------
import Location from './pages/Location';
import Friend from './pages/Friend';
import Chat from './pages/Chat';

const FBSDK = require('react-native-fbsdk');
const {
  AppInviteDialog,
} = FBSDK;

class Main extends Component {

  static refBottomTabBar;
  state = { dataSource: null, currentPage: 0, pages: ['Flight', 'Compass', 'Cards', 'Chat', 'User'] };

  componentWillMount() {
       this.dataSource = new ViewPager.DataSource({
           pageHasChanged: (p1, p2) => p1 !== p2,
       });

       this.setState({
            dataSource: this.dataSource.cloneWithPages(this.state.pages)
       });
   }

   onChangePage(data, bottomTabBar) {
      const pagesArr = ['Flight', 'Compass', 'Cards', 'Chat', 'User'];
      bottomTabBar.setState({ selected: pagesArr[data] });
      bottomTabBar.animateBubble(data);
   }

   setCurrentPage(index) {
     this.viewPagerComponent.goToPage(index, true);
   }

   shareLink = () => {
     AppInviteDialog.canShow(this.state.appInviteContent)
     .then((canShow) => canShow && AppInviteDialog.show(this.state.appInviteContent))
     .then((result, err) => {

      if (result.isCancelled) {
        alert('Share operation was cancelled');
      } else {
        alert('Share was successful with postId: ' + result.postId);
      }
     });
   }

   renderPage(data, pageID) {
      const { viewPagerContainer, title, subtitle, titleSkydreamer } = styles;
      if (data === 'Compass') {
        return (
          <Location />
        );
      } else if (data === 'User') {
        return (
          <Friend />
        );
      } else if (data === 'Chat') {
        return (
          <Chat />
        );
      }
      return (
        <View>
        <TouchableOpacity style={viewPagerContainer}>
          <Text style={titleSkydreamer}>Skydreamer</Text>
          <Text style={title}>Navigation System</Text>
          <Text style={subtitle}>{data}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.shareLink} style={viewPagerContainer}>
          <Text>Share</Text>
        </TouchableOpacity>
        </View>
      );
   }

  render() {
    const { viewContainer,
            viewInnerContainer,
            viewInnerContainer2,
            viewInnerContainer1,
            viewPager } = styles;

    return (
      <View style={viewContainer}>
      <StatusBar
         hidden
      />
      <View style={viewInnerContainer1}>
        <TopTabBar />
      </View>
      <View style={viewInnerContainer}>
        <ViewPager
          style={viewPager}
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
          renderPageIndicator={false}
          initialPage={this.state.currentPage}
          locked
          ref={(viewPagerComponent) => { this.viewPagerComponent = viewPagerComponent; }}
        />
      </View>
      <View style={viewInnerContainer2}>
        <BottomTabBar
          ref={(bottomTabBar) => { this.bottomTabBar = bottomTabBar; }}
        />
      </View>
    </View>
    );
  }
}

const styles = {
  titleSkydreamer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#000'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#999'
  },
  subtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 35,
    color: '#EC514C'
  },
  viewPager: {
      flex: 1
  },
  viewPagerContainer: {
      flex: 1
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFF8F6'
  },
  viewInnerContainer: {
    flex: 1,
    marginTop: 50
  },
  viewInnerContainer2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  viewInnerContainer1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1
  }
};

export default Main;
