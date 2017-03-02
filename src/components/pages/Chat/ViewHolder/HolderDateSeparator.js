import React from 'react';
import { View, Text } from 'react-native';

const HolderDateSeparator = ({ timestamp }) => {
  return (
    <View style={styles.spinnerStyle}>
      <Text style={styles.text}>{timestamp}</Text>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#AFA3C6',
    alignSelf: 'center',
    margin: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  }
};

export default HolderDateSeparator;
