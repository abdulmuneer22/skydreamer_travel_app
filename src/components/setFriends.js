/**
 * @Class:             setFriends.js
 * @Description:       Render Topic selector page
 * @Author:            Paol Pirruccio     @Date: 23/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';

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


export default class SetFriends extends Component {



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
      <View style={styles.textContainer}>
        <Text style={styles.pageNumber}>
          4/5
        </Text>
        <Text style={styles.upperTitle}>
          Are you travelling
        </Text>
        <Text style={styles.textTitle}>
          With friends?
        </Text>
      </View>
    );
  }
}
