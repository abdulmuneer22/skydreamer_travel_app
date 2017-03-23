/**
 * @Class:             SetPriceSession.js
 * @Description:       Render Price Session Page
 * @Author:            Guilherme Borges Bastos     @Date: 21/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  Fixed eslint, removed bind
 * Alberto Schiabel    14/03/2017  refactored images import
 */
import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import ButtonNext from './ButtonNext';
import SessionGradient from './SessionGradient';
// Later on in your styles..
const styles = {
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
  textContainer: {
    flex: 1,

  },
  textValue: {
    color: '#ffffff',
    fontSize: 78,
    fontFamily: 'Poppins-Light',
    justifyContent: 'flex-start',
  },
  upperTitle: {
    color: '#ffffff',
    fontSize: 25,
    lineHeight: 20,
    fontFamily: 'Poppins-Light',
    textAlign: 'left',
  },
  pageNumber: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  sign: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  textTitle: {
    color: '#ffffff',
    fontSize: 36,
    lineHeight: 50,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
  },
  slider: {
    height: 10,
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
};

export default class SetPriceSession extends Component {

  state = {
    value: 250,
  };

  onNextPress = () => {
    Actions.SetDateSession();
  }

  render() {
    const { linearGradient, textContainer, upperTitle, pageNumber, textTitle, slider, sign, textValue } = styles;
    const { value } = this.state;

    return (
      <View>
        <View style={textContainer}>
          <Text style={pageNumber}>
            1/5
          </Text>
          <Text style={upperTitle}>
            How much do you want to
          </Text>
          <Text style={textTitle}>
            Spend to fly?
          </Text>
          <Text style={textValue}>{value}$</Text>

        </View>
        <Slider
          value={value}
          step={50}
          minimumValue={50}
          maximumValue={3000}
          minimumTrackTintColor="#1B9AF7"
          maximumTrackTintColor="#999999"
          thumbTintColor="#fff"
          style={slider}
          trackStyle={{ position: 'relative' }}
          onValueChange={newValue => this.setState({ value: newValue })}
        />
      </View>
    );
  }
}
