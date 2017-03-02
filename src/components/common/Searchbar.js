import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Searchbar = ({ value, onChangeText, onPress, placeholder, secureTextEntry, placeholderColor, underlineColor }) => {
  const { inputStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderStyle={{ fontFamily: 'NotoSans-Regular', fontSize: 18 }}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderColor || 'white'}
        underlineColorAndroid={underlineColor || 'white'}
      />
      <TouchableOpacity onPress={onPress}>
        <Icon name='clear' size={20}  />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 20,
    fontSize: 18,
    lineHeight: 35,
    flex: 1,
    fontFamily: 'NotoSans-Regular'
  },
  containerStyle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',

    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'

  }
};

export { Searchbar };
