import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'relative',
  },
});

const CardSection = ({ children, style }) => (
  <View style={[styles.containerStyle, style]}>
    {children}
  </View>
);

CardSection.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardSection;
