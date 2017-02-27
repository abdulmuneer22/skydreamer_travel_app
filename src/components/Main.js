import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import ViewPager from 'react-native-viewpager';
import BottomTabBar from './BottomTabBar';
import TopTabBar from './TopTabBar';

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

   renderPage(data, pageID) {
      const { viewPagerContainer, title, subtitle, titleSkydreamer } = styles;
      return (
        <TouchableOpacity style={viewPagerContainer}>
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
          <TopTabBar />
        </View>
        <View style={viewInnerContainer}>
          <ViewPager
            style={viewPager}
            dataSource={this.state.dataSource}
            renderPage={this.renderPage}
            onChangePage={(data) => this.onChangePage(data, this.bottomTabBar)}
            renderPageIndicator={false}
            initialPage={this.state.currentPage}
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF8F6'
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFF8F6'
  },
  viewInnerContainer: {
    flex: 1,
    marginTop: 75,
    marginBottom: 80,
    zIndex: 0
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
