import React, { Component } from 'react';
import { View, Text } from 'react-native';

class HolderSelfText extends Component {
  setHiddenPicTextStyle() {
    if (this.props.hiddenProfile) {
      return { marginRight: 50 };
    }
  }

  setMoreSpaceStyle() {
    const { moreSpace } = this.props;
    if (moreSpace) {
      return { marginTop: 15 };
    }
  }

  setSquareCorners() {
    const { squareCorner, semiSquareCorner } = this.props;
    if (squareCorner === true && semiSquareCorner === false) {
      return {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderRadius: 10,
        marginTop: 2,
      };
    } else if (semiSquareCorner === true) {
      return {
        borderTopRightRadius: 10,
        borderRadius: 50,
        marginTop: 2,
      };
    }

    return { borderRadius: 50, borderBottomRightRadius: 10 };
  }

  renderText() {
    const { text } = this.props;
    const { textViewStyle, textStyle } = styles;
    return (
      <View style={textViewStyle}>
        <Text style={[textStyle, this.setSquareCorners()]}>{text}</Text>
      </View>
    );
  }

  render() {
    const { rowContainer } = styles;
    return (
      <View style={[rowContainer, this.setMoreSpaceStyle()]}>
        {this.renderText()}
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#EC514D',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexWrap: 'wrap',
    color: '#fff',
  },
  textViewStyle: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    paddingRight: 10,
  },
};

export { HolderSelfText };
