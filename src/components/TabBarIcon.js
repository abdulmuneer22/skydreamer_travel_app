// /-----------------------------------------------------------------
// /   Class:          TabBarIcon.js
// /   Description:    Render icons inside of BottomTabBar Component
// /   Author:         Guilherme Borges Bastos       Date: 23/02/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /   Alberto Schiabel 11/03/2017  Fixed eslint, pointed out possible
// /                                bad behaviours
// /-----------------------------------------------------------------
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
/**
 * Author: Alberto Schiabel
 *
 * This can painful for the performance: is there a precise reason related to
 * why you imported this icon sets and then render them accordingly to the prop
 * `fontFamily`?
 */
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/SimpleLineIcons';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = {
  iconActiveStyle: {
    color: '#EA3F39',
    alignSelf: 'center',
    marginTop: 15,
  },
  iconStyle: {
    color: '#A89DC5',
    alignSelf: 'center',
    marginTop: 15,
  },
  textStyle: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'NotoSans-Light',
    fontSize: 12,
  },
  textActiveStyle: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  bubble: {
    width: 25,
    height: 25,
    backgroundColor: '#FF6D00',
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 30,
    right: 7,
    marginTop: 5,
    elevation: 8,
    transform: [{ scale: this.springValue }],
  },
  bubbleText: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 14,
    marginTop: 0,
  },
  viewContainer: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFFFFF',
  },
  viewActiveContainer: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderColor: '#EA3F39',
  },
};

export default class TabBarIcon extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    notificationNumber: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.3);
  }

  componentDidMount() {
    this.spring();
  }

  setStyle = (parent) => {
    const { text } = this.props;
    const { iconActiveStyle, iconStyle } = styles;
    return (
      parent.state.selected === text ?
        iconActiveStyle :
        iconStyle
    );
  }

  setTextStyle = (parent, text) => {
    const { textActiveStyle, textStyle } = styles;
    if (parent.state.selected === text) {
      return textActiveStyle;
    }
    return textStyle;
  }

  setBubbleStyle = (num) => {
    if (num > 99) {
      return {
        width: 38,
      };
    }
    return {};
  }

  setBubbleMarginStyle = (parent, text) => {
    if (parent.state.selected !== text) {
      return { marginTop: 10 };
    }
    return {};
  }

  setContainerStyle = (parent, text) => {
    const { viewContainer, viewActiveContainer } = styles;
    if (parent.state.selected === text) {
      return viewActiveContainer;
    }
    return viewContainer;
  }

  spring = (parent = null, pageIndex = null) => {
    if (parent !== null) {
      // parent.onIconPressed();
      this.changeStateToSelected(parent, this.props.text);
      if (pageIndex !== null) {
        parent.changeActiveIcon(pageIndex);
      }
    }

    this.springValue.setValue(1.5);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
      },
    ).start();
  }

  changeStateToSelected = (parent, thisName) => {
    /**
     * Author: Alberto Schiabel
     *
     * I'm pretty sure this is dangerous, 'cause you're accessing the parent's
     * state, and that's just how React is meant to be used. Changing the
     * parent's state, you basically cause the parent to call render() again.
     * I'm going to inspect this parent call stuff thoroughly.
     */
    parent.setState({ selected: thisName });
  }

  render() {
    // not sure why this was used
    const parent = this._reactInternalInstance._currentElement._owner._instance;
    const { bubbleText } = styles;
    // console.log(parent.state.selected);

    return (
      <View style={this.setContainerStyle(parent, this.props.text)}>
        {this.props.notificationNumber > 0 &&
          <Animated.View
            style={[
              {
                width: 20,
                height: 20,
                backgroundColor: '#EC514C',
                position: 'absolute',
                borderRadius: 30,
                right: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                marginTop: 10,
                transform: [{ scale: this.springValue }],
              },
              this.setBubbleStyle(this.props.notificationNumber),
            ]}
          >
            <Text style={bubbleText}>{this.props.notificationNumber}</Text>
          </Animated.View>
        }
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.spring(parent, this.props.pageIndex)}
        >
          { this.props.fontFamily === 'MaterialCommunityIcons' &&
            <Icon5
              name={this.props.iconName}
              size={this.props.size}
              style={this.setStyle(parent)}
            />
          }
          { this.props.fontFamily === 'SimpleLineIcons' &&
            <Icon4
              name={this.props.iconName}
              size={this.props.size - 1}
              style={this.setStyle(parent)}
            />
          }
          { this.props.fontFamily === 'FontAwesome' &&
            <Icon3
              name={this.props.iconName}
              size={this.props.size}
              style={this.setStyle(parent)}
            />
          }
          { this.props.fontFamily === 'MaterialIcons' &&
            <Icon2
              name={this.props.iconName}
              size={this.props.size}
              style={this.setStyle(parent)}
            />
          }
          { this.props.fontFamily === 'Ionicons' &&
            <Icon
              name={this.props.iconName}
              size={this.props.size}
              style={this.setStyle(parent)}
            />
          }
        </TouchableOpacity>

      </View>
    );
  }
}
