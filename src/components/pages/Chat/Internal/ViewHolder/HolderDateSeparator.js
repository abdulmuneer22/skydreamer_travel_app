import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: '#AFA3C6',
    alignSelf: 'center',
    margin: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
};

const HolderDateSeparator = ({ timestamp }) => (
  <View style={styles.spinnerStyle}>
    <Text style={styles.text}>{timestamp}</Text>
  </View>
);

HolderDateSeparator.propTypes = {
  timestamp: PropTypes.string.isRequired,
};

export {
  HolderDateSeparator,
};
