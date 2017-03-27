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
  ScrollView,
  Alert,
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


  render() {
    return (
      <View style={styles.container}>
        <ScrollView
        horizontal={true}
        pagingEnabled={true}
        automaticallyAdjustContentInsets={false}
        >
          <LinearGradient
            colors={['#f36b3c', '#dd1a72']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
                <SetPriceSession/>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#dd1a72', '#7b1bdd']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
                <SetAirportSession/>
              </View>
          </LinearGradient>
          <LinearGradient
            colors={['#7b1bdd', '#1aa9d2']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
                <SetGroupName/>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#1aa9d2', '#3ab35b']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
                <SetFriends/>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#3ab35b', '#ddce26']}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.slide]}>
                <SetFriends/>
            </View>
          </LinearGradient>
        </ScrollView>
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
    padding: 20,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },

});
