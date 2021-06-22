import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../App.css';

/**
 * Component which return the button
 * @param   navigation
 * @param   destination
 * @param   icon
 * @param   text
 * @param   param
 */
const Button = ({
  navigation, icon, text, destination, param,
}) => (
  <TouchableOpacity
    style={[styles.buttonStyle, {
      backgroundColor: 'black', borderWidth: 1, borderColor: 'white', width: '100%',
    }]}
    onPress={() => {
      navigation.replace(destination, param);
    }}
    accessibilityRole="button"
  >
    {icon && <Ionicons name={icon} size={48} color="white" style={{ textAlign: 'center' }} />}
    <Text style={[styles.textTitleW, { textAlign: 'center' }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  param: PropTypes.object,
};

export default Button;
