import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class HolderOtherPhoto extends Component {
  setSquareCorner() {
    const { squareCorner, semiSquareCornerUp, completeSquareCorner, semiSquareCornerDown } = this.props;
    if (squareCorner === true && semiSquareCornerUp === false) {
      return {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRadius: 50,
        marginTop: 2,
      };
    } else if (semiSquareCornerUp === true) {
      return {
        borderTopLeftRadius: 10,
        borderRadius: 50,
        marginTop: 2,
      };
    } else if (semiSquareCornerDown === true) {
      return {
        borderBottomLeftRadius: 10,
        borderRadius: 50,
      };
    }

    // default
    return { borderRadius: 50 };
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

  renderImage() {
    const { url, title, subtitle } = this.props;
    const { textViewStyle, imageStyle, textInnerViewStyle } = styles;
    return (
        <View style={textViewStyle}>
          <View style={textInnerViewStyle}>
            <Image
              source={{ uri: url }}
              style={imageStyle}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000', marginRight: 20 }}>{title}</Text>
            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000' }}>$ {subtitle}</Text>
          </View>
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
            <Image source={{ uri: 'https://storage.skydreamer.io/profile/' + photoSrc }} style={profileImage} />
          }
          {this.renderOnlineUserSign()}
        </View>
        {this.renderImage()}
      </View>
    );
  }
}

const styles = {
  imageStyle: {
    flex: 1,
    height: 175,
    borderRadius: 3,
  },
  textInnerViewStyle: {
    flexDirection: 'row',
    backgroundColor: '#FBE9E7',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#FBE9E7'
  },
  textViewStyle: {
    flex: 0.85,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 2,
    backgroundColor: '#FAFAFA',
    elevation: 1,
    borderRadius: 5,
  },
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginTop: 2
  },
};

export { HolderOtherPhoto };
