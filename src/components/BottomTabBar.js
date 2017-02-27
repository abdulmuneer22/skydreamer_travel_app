import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import TabBarIcon from './TabBarIcon';
import { Actions } from 'react-native-router-flux';

class BottomTabBar extends Component {

  state = {
            selected: 'Flight',
            chatNum: 0,
            notificationNum: 0,
            mapNum: 0,
            friendNum: 7,
            plusFriendNum: 2
          };

  animateBubble(index) {
    switch (index) {
      case 0:
        this.flightComponent.spring();
        break;
      case 1:
        this.compassComponent.spring();
        break;
      case 2:
        this.cardComponent.spring();
        break;
      case 3:
        this.chatComponent.spring();
        break;
      case 4:
        this.friendComponent.spring();
        break;
      default:
        return false;
    }
  }

  isActive(index) {
    if (index === this.state.selected) {
      return true;
    }
    return false;
  }

  addNewFlightBubble(num = null) {
    const currentNum = this.state.chatNum;
    this.setState({ chatNum: currentNum + 1 });
    this.flightComponent.spring();
  }

  addNewCompassBubble(num = null) {
    const currentNum = this.state.notificationNum;
    this.setState({ notificationNum: currentNum + 1 });
    this.compassComponent.spring();
  }

  addNewCardBubble(num = null) {
    const currentNum = this.state.mapNum;
    this.setState({ mapNum: currentNum + 1 });
    this.cardComponent.spring();
  }

  addNewChatBubble(num = null) {
    const currentNum = this.state.friendNum;
    this.setState({ friendNum: currentNum + 1 });
    this.chatComponent.spring();
  }

  addNewFriendBubble(num = null) {
    const currentNum = this.state.plusFriendNum;
    this.setState({ plusFriendNum: currentNum + 1 });
    this.friendComponent.spring();
  }

  clearTokenAuth() {
    AsyncStorage.setItem('token', null);
    Actions.login();
  }

  changeActiveIcon(index) {
    const parent = this._reactInternalInstance._currentElement._owner._instance;
    parent.setCurrentPage(index);
  }

  renderTabBar(parent) {
    const size = 26;

    return (
        <View style={styles.content}>

          <TabBarIcon
            size={size} text="Flight" notificationNumber={this.state.chatNum} fontFamily="MaterialIcons"
            iconName="local-airport"
            ref={(flightComponent) => { this.flightComponent = flightComponent; }}
            pageIndex={0}
          />

          <TabBarIcon
            size={size} text="Compass" notificationNumber={this.state.notificationNum} fontFamily="SimpleLineIcons"
            iconName="compass"
            ref={(compassComponent) => { this.compassComponent = compassComponent; }}
            pageIndex={1}
          />

          <TabBarIcon
            size={size} text="Cards" notificationNumber={this.state.mapNum} fontFamily="MaterialCommunityIcons"
            iconName="cards-playing-outline"
            ref={(cardComponent) => { this.cardComponent = cardComponent; }}
            pageIndex={2}
          />

          <TabBarIcon
            size={size} text="Chat" notificationNumber={this.state.friendNum} fontFamily="MaterialIcons"
            iconName="chat-bubble-outline"
            ref={(chatComponent) => { this.chatComponent = chatComponent; }}
            pageIndex={3}
          />

          <TabBarIcon
            size={size} text="User" notificationNumber={this.state.plusFriendNum} fontFamily="SimpleLineIcons"
            iconName="user"
            ref={(friendComponent) => { this.friendComponent = friendComponent; }}
            pageIndex={4}
          />

        </View>
    );
  }

  render() {
    const parent = this._reactInternalInstance._currentElement._owner._instance;
    return (
      <View>
        { this.renderTabBar(parent) }
      </View>
    );
  }
}

const styles = {
   content: {
     flex: 1,
     flexDirection: 'row',
     paddingLeft: 15,
     paddingRight: 15,
     backgroundColor: '#FFFFFF'
   }
};

export default BottomTabBar;
