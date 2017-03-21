import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const styles = {
  textStyle: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 7
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ee4e16',
    borderRadius: 25,
    marginLeft: 50,
    marginRight: 50,
    height: 35,
    elevation: 2
  },
};

const ButtonCreateAccount = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

ButtonCreateAccount.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonCreateAccount;
