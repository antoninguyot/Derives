import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';

const CloseIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      position: 'absolute',
      top: 30,
      left: 10,
    }}
    onPress={onPress}
  >
    <Ionicons name="md-close-circle-outline" size={32} color="darkgrey" />
  </TouchableOpacity>
);

CloseIcon.propTypes = { onPress: PropTypes.func.isRequired };

export default CloseIcon;
