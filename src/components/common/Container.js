/**
 * @Class:             Container.js
 * @Description:       Render a common basic container view
 * @Author:            Alberto Schiabel      @Date: 14/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */
import React, { PropTypes } from 'react';
import {
  View
} from 'react-native';

const containerBaseStyle = {
  flex: 1,
};

const Container = ({styles, children}) => (
  <View style={[containerBaseStyle, styles]}>
    {children}
  </View>
);

Container.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  styles: {},
};

export default Container;
