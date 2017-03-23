/**
 * @Class:             SetAirportSession.js
 * @Description:       Render Airport Session Page
 * @Author:            Guilherme Borges Bastos     @Date: 21/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  Fixed eslint, slightly refactored
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';

import ButtonNext from './ButtonNext';

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


export default class SetAirportSession extends Component {

  state = {
    value: "AMS",
  };

  onNextPress = () => {
    Actions.Main();
  };

  render() {
    const { value } = this.state;
    const {
      linearGradient,
      textTitle,
      slider,
      textValue,
    } = styles;

    return (
      <View style={styles.textContainer}>
        <Text style={styles.pageNumber}>
          2/5
        </Text>
        <Text style={styles.upperTitle}>
          Where do you
        </Text>
        <Text style={styles.textTitle}>
          Want to fly from?
        </Text>
        <Text style={styles.textValue}>{value}</Text>
      </View>
    );
  }
}
