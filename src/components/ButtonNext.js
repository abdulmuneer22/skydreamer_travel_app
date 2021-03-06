/**
 * @Class:             ButtonNext.js
 * @Description:       Render next button on Session Pages
 * @Author:            Guilherme Borges Bastos      @Date: 20/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    13/03/2017  eslint
 */
import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  textStyle: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'NotoSans-Semibold',
    marginRight: 30,
    marginLeft: 30,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    padding: 20,
  },
};

const ButtonNext = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
      <Icon name="chevron-right" size={30} color="#fff" style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }} />
    </TouchableOpacity>
  );
};

ButtonNext.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonNext;
