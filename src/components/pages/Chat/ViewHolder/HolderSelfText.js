import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class HolderSelfText extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {};
  }
  */

  renderOnlineUserSign() {
    const { id } = this.props;
    const { onlineUserSign } = styles;
    if (id === 0 || id === 1 || id === 3 || id === 5) {
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
    const { rowContainer,
            profileImage } = styles;

    const { photoSrc } = this.props;

    return (
      <View style={rowContainer}>
        {this.renderText()}
        <View style={{ flex: 0.2 }}>
          <Image source={{ uri: photoSrc }} style={profileImage} />
          {this.renderOnlineUserSign()}
        </View>
      </View>
    );
  }
}

const styles = {
  onlineUserSign: {
    backgroundColor: '#51CA31',
    width: 10,
    height: 10,
    borderRadius: 50,
    position: 'absolute',
    right: 11,
    top: 11,
    borderColor: '#FFF8F6',
    borderWidth: 1
  },
  profileImage: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: 7,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#FAE6E3',
    borderRadius: 50,
    padding: 5,
    paddingLeft: 20,
    width: 195
  },
  textViewStyle: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 65
  }
};

export default HolderSelfText;
