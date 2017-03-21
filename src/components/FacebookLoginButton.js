import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  fbText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: 'white',
    marginRight: 35,
  },
  iconStyle: {
    marginLeft: 35,
    marginRight: 15,
  },
});

const FacebookLoginButton = ({ onPress }) => (
  <Icon.Button
    name="facebook"
    backgroundColor="#3b579d"
    onPress={onPress}
    borderRadius={25}
    iconStyle={styles.iconStyle}
  >
    <Text style={styles.fbText}>Login with Facebook</Text>
  </Icon.Button>
);

FacebookLoginButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default FacebookLoginButton;
