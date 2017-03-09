import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  fbText: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: 'white',
  },
});

const FacebookLoginButton = ({ onPress }) => (
  <Icon.Button
    name="facebook"
    backgroundColor="#3b5998"
    onPress={onPress}
  >
    <Text style={styles.fbText}>Login with Facebook</Text>
  </Icon.Button>
);

FacebookLoginButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default FacebookLoginButton;
