///-----------------------------------------------------------------
///   Namespace:      Router.js
///   Class:          Main.js
///   Description:    Render Main Page ( View Pager, BottomTabBar & TopTabBar )
///   Author:         Guilherme Borges Bastos       Date: 23/02/2017
///   Notes:
///   Revision History:
///   Name:               Date:         Description:
///   Guilherme Bastos    28/02/2017    Added Chat Page
///   Guilherme Bastos    06/03/2017    Added TopChatBar
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

// @TODO: add this fb stuff to its own aciont.js and reducer.js
import FBSDK from 'react-native-fbsdk';
const {
  AppInviteDialog,
  ShareDialog,
  ShareApi,
} = FBSDK;

class Main extends Component {

  state = {
    dataSource: null, currentPage: 0, pages: ['Flight', 'Compass', 'Cards', 'Chat', 'User'],
    appInviteContent: {
      applinkUrl: 'https://fb.me/253439161770978',
    },
    shareLinkContent: {
      contentType: 'link',
      contentUrl: 'https://skydreamer.io/',
      contentDescription: 'Come visit us!',
    }
  };

  componentWillMount() {
    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.setState({
      dataSource: this.dataSource.cloneWithPages(this.state.pages)
    });
  }

  onChangePage = (data, bottomTabBar) => {
    const pagesArr = ['Flight', 'Compass', 'Cards', 'Chat', 'User'];
    bottomTabBar.setState({ selected: pagesArr[data] });
    bottomTabBar.animateBubble(data);
  }

  setCurrentPage = (index) => {
    this.topTabBarComponent.setState({ currentPage: index });
    this.viewPagerComponent.goToPage(index, true);
  }

  /**
   * Author: Alberto Schiabel
   *
   * Shares something in the user's diary. The user can also decide
   * to add a comment before posting.
   * https://developers.facebook.com/docs/react-native/sharing
   */
  shareFacebookLinkWithCommentDefinedByTheUser = () => {
    console.log('shareFacebookLinkWithCommentDefinedByTheUser');
    ShareDialog.canShow(this.state.shareLinkContent)
    .then((canShow) => canShow && ShareDialog.show(this.state.shareLinkContent))
    .then((result, err) => {
      if (err) console.log('err', err);
      if (result.isCancelled) {
        console.log('Share operation was cancelled');
      } else {
        console.log('Share was successful with postId: ', result.postId);
      }
    });
  }

  /**
   * Author: Alberto Schiabel
   *
   * Basically the same as shareFacebookLinkWithCommentDefinedByTheUser,
   * except that this method accepts a predefined comment as a parameter,
   * which isn't editable by the user.
   * https://developers.facebook.com/docs/react-native/sharing
   */
  shareFacebookLinkWithPrefinedComment = (message = 'Some message') => {
    console.log('shareFacebookLinkWithPrefinedComment');
    ShareApi.canShare(this.state.shareLinkContent)
    .then((canShare) => canShare && ShareApi.share(this.state.shareLinkContent, '/me', message))
    .then((result, err) => {
      if (err) console.log('err', err);
      if (result) {
        console.log('Share was successful with postId', result.postId);
      }
    });
  }

  /**
   * Author: Alberto Schiabel
   *
   * Allows the user to send an invite to some friends.
   * It seems that we can't retrieve the invited users' list.
   * Also, this react native API is not documented at the moment.
   */
  sendFacebookAppInvite = () => {
    console.log('sendFacebookAppInvite');
    AppInviteDialog.canShow(this.state.appInviteContent)
    .then((canShow) => canShow && AppInviteDialog.show(this.state.appInviteContent))
    .then((result, err) => {
      if (err) console.log('err', err);
      if (result.isCancelled) {
        console.log('appInvite operation was cancelled');
      } else {
        console.log('appInvite was successful: ', result);
      }
    });
  }

  // renderPage(data, pageID) {
  renderPage = (data) => {
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
      <TouchableOpacity
        style={viewPagerContainer}
        /**
         * Basically I'm temporarily using this onPress as a PlayGround for the fb methods
         */
        //onPress={() => this.shareFacebookLinkWithPrefinedComment('Some test message')}
      >
        <Text style={titleSkydreamer}>Skydreamer</Text>
        <Text style={title}>Navigation System</Text>
        <Text style={subtitle}>{data}</Text>
      </TouchableOpacity>
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
        <TopTabBar
          ref={(topTabBarComponent) => { this.topTabBarComponent = topTabBarComponent; }}
        />
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
    flex: 1,
    marginTop: 50
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFF8F6'
  },
  viewInnerContainer: {
    flex: 1,
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
