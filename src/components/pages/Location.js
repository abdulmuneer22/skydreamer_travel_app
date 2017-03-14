/**
 * @Namespace:         Main.js
 * @Class:             Location.js
 * @Description:       Render MapView
 * @Author:            Guilherme Borges Bastos   @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  eslint, refactored
 * Alberto Schiabel    14/03/2017  refactored images import
 */
import React, { Component, PropTypes } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import flagImg from 'skydreamer/images/flag-blue.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -19.752220;
const LONGITUDE = -47.960770;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginTop: 50,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default class Location extends Component {

  static propTypes = {
    provider: PropTypes.string,
  };

  static defaultProps = {
    provider: 'google',
  };

  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  render() {
    return (
      <MapView
        provider={this.props.provider}
        style={styles.map}
        initialRegion={this.state.region}
        onPress={this.onMapPress}
        loadingEnabled
        loadingIndicatorColor="#666"
        loadingBackgroundColor="#eee"
      >
        <MapView.Marker
          coordinate={{
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          }}
          centerOffset={{ x: -18, y: -60 }}
          anchor={{ x: 0.69, y: 1 }}
          image={flagImg}
        />
        <MapView.Marker
          coordinate={{
            latitude: LATITUDE - SPACE,
            longitude: LONGITUDE - SPACE,
          }}
          centerOffset={{ x: -42, y: -60 }}
          anchor={{ x: 0.84, y: 1 }}
        >
          <MapView.Callout>
            <View>
              <Text>This is a plain view</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    );
  }
}
