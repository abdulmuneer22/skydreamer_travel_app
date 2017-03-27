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
  state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      latitude: 'unknown',
      longitude: 'unknown',
      airports: 'unknown'
  };
  watchID :
      ? number = null;
  fetchButton() {
      var range = 80;
      var limit = 10;

      fetch('https://api.skydreamer.io/airport/get/nearest', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuc2t5ZHJlYW1lci5pbyIsImF1ZCI6Imh0dHA6XC9cL3d3dy5za3lkcmVhbWVyLmlvIiwiaWF0IjoxNDg2NDg2NDM2fQ.yDp6ph18KT-rv8tNriL5AFQq58XANFi9QLkkjdLYXJQ'
          },
          body: 'latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&range=' + range + '&limit=' + limit
      }).then((response) => response.json()).then((responseData) => {
          this.setState({airports: responseData});
      });
      //JSON file for offline testing purpouses
      //this.setState({airports: {"success":true,"message":"","data":[{"code":"BLQ","distance_km":"13.3432","name":"Guglielmo Marconi","cityCode":"BLQ","cityName":"Bologna","countryName":"ITALY","countryCode":"IT","timezone":"1","latitude":"44.535444","longitude":"11.288667","numAirports":"1","city":"true"},{"code":"FRL","distance_km":"65.0489","name":"Luigi Ridolfi Arpt","cityCode":"FRL","cityName":"Forli","countryName":"ITALY","countryCode":"IT","timezone":"1","latitude":"44.194753","longitude":"12.070094","numAirports":"1","city":"true"}]}});
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
          var initialPosition = JSON.stringify(position);
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          this.setState({latitude});
          this.setState({longitude});
          this.setState({initialPosition});
      }, (error) => alert(JSON.stringify(error)), {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
      });
      this.watchID = navigator.geolocation.watchPosition((position) => {
          var lastPosition = JSON.stringify(position);
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          this.setState({latitude});
          this.setState({longitude});
          this.setState({lastPosition});
      })
  }

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
