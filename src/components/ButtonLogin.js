import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonLogin = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 13,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#159fdb',
    borderRadius: 25,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    height: 50
  }
};

export default ButtonLogin;
