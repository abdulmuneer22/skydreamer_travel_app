import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class HolderSelfText extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {};
  }
  */

  setHiddenPicTextStyle() {
    if (this.props.hiddenProfile) {
      return { marginRight: 50 };
    }
  }

  renderOnlineUserSign() {
    const { id } = this.props;
    const { onlineUserSign } = styles;
    if ((id === 0 || id === 1 || id === 3 || id === 5) && !this.props.hiddenProfile) {
      return (
        <View style={onlineUserSign} />
      );
    }
  }

  renderText() {
    const { text } = this.props;
    const { textViewStyle, textStyle } = styles;
    return (
      <View style={textViewStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    );
  }

  render() {
    const { rowContainer } = styles;
    return (
      <View style={rowContainer}>
        {this.renderText()}
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#E12A68',
    borderRadius: 50,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexWrap: 'wrap',
    color: '#fff'
  },
  textViewStyle: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginTop: 3
  }
};

export default HolderSelfText;
