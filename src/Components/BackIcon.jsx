import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const BackIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      marginBottom: 5,
      marginLeft: 5,
    }}
    onPress={onPress}
  >
    <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey" />
  </TouchableOpacity>
);

BackIcon.propTypes = { onPress: PropTypes.func.isRequired };

export default BackIcon;
