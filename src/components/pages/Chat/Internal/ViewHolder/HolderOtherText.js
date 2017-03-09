import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class HolderOtherText extends Component {
  setSquareCorner() {
    const { squareCorner, semiSquareCorner } = this.props;
    if (squareCorner === true && semiSquareCorner === false) {
      return {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRadius: 50,
      };
    } else if (semiSquareCorner === true) {
      return {
        borderTopLeftRadius: 10,
        borderRadius: 50,
        marginTop: 2,
      };
    }
    return { borderRadius: 50, borderBottomLeftRadius: 10 };
  }

  setMoreSpaceStyle() {
    const { moreSpace } = this.props;
    if (moreSpace) {
      return { marginTop: 15 };
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
        <Text style={[textStyle, this.setSquareCorner()]}>{text}</Text>
      </View>
    );
  }

  render() {
    const { rowContainer,
            profileImage } = styles;

    const { photoSrc } = this.props;

    return (
      <View style={[rowContainer, this.setMoreSpaceStyle()]}>
        <View style={{ flex: 0.15 }}>
          {!this.props.hiddenProfile &&
            <Image source={{ uri: photoSrc }} style={profileImage} />
          }
          {this.renderOnlineUserSign()}
        </View>
        {this.renderText()}
      </View>
    );
  }
}

const styles = {
  onlineUserSign: {
    backgroundColor: '#51CA31',
    width: 8,
    height: 8,
    borderRadius: 50,
    position: 'absolute',
    right: 8,
    top: 5,
    borderColor: '#FFF8F6',
    borderWidth: 1,
  },
  profileImage: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: 2,
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#FBE9E7',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexWrap: 'wrap',
    color: '#1C1918',
  },
  textViewStyle: {
    flex: 0.85,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 20,
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
    marginTop: 0,
  },
};

export { HolderOtherText };
