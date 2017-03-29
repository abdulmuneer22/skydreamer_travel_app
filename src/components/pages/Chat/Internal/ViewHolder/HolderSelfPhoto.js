import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class HolderSelfPhoto extends Component {
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
    const { squareCorner, semiSquareCornerUp, completeSquareCorner, semiSquareCornerDown } = this.props;
    if (squareCorner === true && semiSquareCornerUp === false) {
      return {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderRadius: 10,
        marginTop: 2,
      };
    } else if (semiSquareCornerUp === true) {
      return {
        borderTopRightRadius: 10,
        borderRadius: 50,
        marginTop: 2,
      };
    } else if (semiSquareCornerDown === true) {
      return {
        borderBottomRightRadius: 10,
        borderRadius: 50,
      };
    }

    // default
    return { borderRadius: 50 };
  }

  renderImage() {
    // const { url, title, subtitle } = this.props;
    const { url, subtitle } = this.props;
    const { textViewStyle, imageStyle, textInnerViewStyle } = styles;

    let title = 'Ibiza Party 2017!';

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
    const { rowContainer } = styles;
    return (
      <View style={[rowContainer, this.setMoreSpaceStyle()]}>
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
    width: 280,
  },
  textInnerViewStyle: {
    flexDirection: 'row',
    backgroundColor: '#FBE9E7',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    backgroundColor: '#FBE9E7'
  },
  textViewStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginLeft: 60,
    backgroundColor: '#FAFAFA',
    elevation: 1,
    borderRadius: 5,
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
    marginTop: 2
  },
};

export { HolderSelfPhoto };
