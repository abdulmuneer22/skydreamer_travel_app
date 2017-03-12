// /-----------------------------------------------------------------
// /   Namespace:      Router.js
// /   Class:          Main.js
// /   Description:    Render Main Page ( View Pager, BottomTabBar & TopTabBar )
// /   Author:         Guilherme Borges Bastos       Date: 23/02/2017
// /   Notes:
// /   Revision History:
// /   Name:               Date:         Description:
// /   Guilherme Bastos    28/02/2017    Added Chat Page
// /   Guilherme Bastos    06/03/2017    Added TopChatBar
// /-----------------------------------------------------------------
import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import ViewPager from 'react-native-viewpager';

// redux connection here is only to test fbApis
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { facebookApiActions } from '../actions';

import BottomTabBar from './BottomTabBar';
import TopTabBar from './TopTabBar';
// ----------- PAGES COMPONENT --------------
import Location from './pages/Location';
import Friend from './pages/Friend';
import Chat from './pages/Chat';

const styles = {
  titleSkydreamer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#000',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: '#999',
  },
  subtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 35,
    color: '#EC514C',
  },
  viewPager: {
    flex: 1,
  },
  viewPagerContainer: {
    flex: 1,
    marginTop: 50,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFF8F6',
  },
  viewInnerContainer: {
    flex: 1,
  },
  viewInnerContainer2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  viewInnerContainer1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
};

class Main extends Component {

  static propTypes = {
    fbActions: PropTypes.shape({
      sendFacebookAppInvite: PropTypes.func.isRequired,
      shareFacebookLinkWithCommentDefinedByTheUser: PropTypes.func.isRequired,
      shareFacebookLinkWithPrefinedComment: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    dataSource: null, currentPage: 0, pages: ['Flight', 'Compass', 'Cards', 'Chat', 'User'],
  };

  componentWillMount() {
    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.setState({
      dataSource: this.dataSource.cloneWithPages(this.state.pages),
    });
  }

  componentDidMount() {
    console.log('facebookApiActions', facebookApiActions);
    console.log('this.props inside Main.js', this.props);
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
        onPress={() => { this.props.fbActions.sendFacebookAppInvite(); }}
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

const mapStateToProps = state => ({
  facebook: state.facebook,
});

const mapDispatchToProps = dispatch => ({
  fbActions: bindActionCreators(facebookApiActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
