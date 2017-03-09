// /-----------------------------------------------------------------
// /   Class:          SetPriceSession.js
// /   Description:    Render Price Session Page
// /   Author:         Guilherme Borges Bastos       Date: 21/02/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /-----------------------------------------------------------------
import React, { Component } from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'react-native-slider';
import ButtonNext from './ButtonNext';
import { Actions } from 'react-native-router-flux';

class SetPriceSession extends Component {

  state = { value: 250 };

  onNextPress() {
    Actions.setDateSession();
  }

  render() {
    const { linearGradient, textTitle, slider, textValue } = styles;

    return (
      <LinearGradient
        colors={['#EE3030', '#A71FAD']}
        style={linearGradient}
      >
        <Text style={textTitle}>
            How much do you want to spend for your flight?
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
          onValueChange={value => this.setState({ value })}
        />

        <ButtonNext onPress={this.onNextPress.bind(this)}>
            Choose the date
          </ButtonNext>

      </LinearGradient>
    );
  }
}


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

export default SetPriceSession;
