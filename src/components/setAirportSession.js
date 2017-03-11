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
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  textValue: {
    color: '#FFF',
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    fontSize: 55,
    fontFamily: 'NotoSans-Regular',
    justifyContent: 'flex-start',
  },
  textTitle: {
    color: '#FFF',
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    paddingBottom: 20,
    fontSize: 35,
    lineHeight: 50,
    fontFamily: 'NotoSans-Regular',
    alignSelf: 'center',
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
    value: 1500,
  };

  onNextPress = () => {
    Actions.Main();
  };

  render() {
    const {
      linearGradient,
      textTitle,
      slider,
      textValue,
    } = styles;

    return (
      <LinearGradient
        colors={['#4800FC', '#0593FF']}
        style={linearGradient}
      >
        <Text style={textTitle}>
          Where do you want to fly from?
        </Text>

        <Text style={textValue}>US$ {this.state.value}</Text>

        <Slider
          value={this.state.value}
          step={1}
          minimumValue={50}
          maximumValue={3000}
          minimumTrackTintColor="#1B9AF7"
          maximumTrackTintColor="#999999"
          thumbTintColor="#fff"
          style={slider}
          trackStyle={{ position: 'relative' }}
          onValueChange={newValue =>
            this.setState({ value: newValue })
          }
        />

        <ButtonNext onPress={this.onNextPress}>
          Choose the date
        </ButtonNext>

      </LinearGradient>
    );
  }
}
