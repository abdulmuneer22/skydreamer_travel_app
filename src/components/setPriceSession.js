/**
 * @Class:             SetPriceSession.js
 * @Description:       Render Price Session Page
 * @Author:            Guilherme Borges Bastos     @Date: 21/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  Fixed eslint, removed bind
 */
import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
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
  textContainer: {
    marginTop: 25,
    marginRight: 45,
    marginLeft: 45
  },
  textValue: {
    color: '#f77633',
    fontSize: 70,
    fontFamily: 'Poppins-Light',
    justifyContent: 'flex-start',
  },
  upperTitle: {
    color: '#000',
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Poppins-Light',
    alignSelf: 'center',
  },
  pageNumber: {
    color: '#8f9fb6',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  textTitle: {
    color: '#000',
    fontSize: 30,
    lineHeight: 40,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
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
    const { linearGradient, textContainer, upperTitle, pageNumber, textTitle, slider, textValue } = styles;
    const { value } = this.state;

    return (
      <LinearGradient
        colors={['#ffff', '#ffff']}
        style={linearGradient}
      >
        <Image
          style={{height: 150}}
          source={require('../images/map.png')}
        />
        <View style={textContainer}>
          <Text style={pageNumber}>
            1/6
          </Text>
          <Text style={upperTitle}>
            How much do you want to
          </Text>
          <Text style={textTitle}>
            Spend for your flight?
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
        <ButtonNext onPress={this.onNextPress}>
          >
        </ButtonNext>
      </LinearGradient>
    );
  }
}
