/**
 * @Class:             SessionGradient.js
 * @Description:       Render Session Gradient and map
 * @Author:            Paolo Pirruccio     @Date: 20/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */


import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import LinearGradient from 'react-native-linear-gradient';
import MapImage from 'skydreamer/images/map.png';

function incrementColor(color, step) {
  const intColor = parseInt(color.substr(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
};

const SessionGradient = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      count: 0,
      colorTop: '#dd1a71',
      colorBottom: '#f67634',
    }
  },

  componentDidMount() {
    this.setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 1),
        colorBottom: incrementColor(this.state.colorBottom, 1),
      });
    }, 20);
  },

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={[this.state.colorTop, this.state.colorBottom]}
          style={styles.gradient}>
          <Image
            source={MapImage}
          />
          </LinearGradient>

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  gradient: {
    flex: 1,
    width: null,
    height: null,
  },
  image: {
  }
});

export default SessionGradient;
