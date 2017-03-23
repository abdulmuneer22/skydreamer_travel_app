/**
 * @Class:             SessionGradient.js
 * @Description:       Render Session Gradient and map
 * @Author:            Paolo Pirruccio     @Date: 20/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import LinearGradient from 'react-native-linear-gradient';
import MapImage from 'skydreamer/images/map.png';
import AppIntro from 'react-native-app-intro';
import SetPriceSession from './setPriceSession';
import SetAirportSession from './setAirportSession';
import SetGroupName from './setGroupName';
import SetTopics from './setTopics';
import SetFriends from './setFriends';

//import SetDateSession from './setDateSession';


export default class SessionGradient extends Component {
  state = {
      value: 250,
    };
  render() {
    return (
      <View style={styles.container}>
        <AppIntro>
          <LinearGradient
            colors={['#f36b3c', '#e0256a']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
              <View level={10}>
                  <SetPriceSession/>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#e0256a', '#280DFF']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
              <View level={10}>
                  <SetAirportSession/>
              </View>
              </View>
          </LinearGradient>
          <LinearGradient
            colors={['#280DFF', '#0DF1FF']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
              <View level={10}>
                  <SetTopics/>
              </View>
              </View>
          </LinearGradient>
          <LinearGradient
            colors={['#0DF1FF', '#89FF0D']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
              <View level={10}>
                  <SetFriends/>
              </View>
              </View>
          </LinearGradient>
        </AppIntro>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: null,
    height: null,
  },
  image: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },

});
