import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const BackIcon = ({ onPress, mode }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      position: 'absolute',
      top: 30,
      right: 10,
      marginBottom: 5,
      marginLeft: 5,
    }}
    onPress={onPress}
  >
    {mode === 'read'
    && <Ionicons name="md-headset-outline" size={32} color="darkgrey" />
    || <Ionicons name="md-camera-outline" size={32} color="darkgrey" />}
  </TouchableOpacity>
);

BackIcon.propTypes = { onPress: PropTypes.func.isRequired, mode: PropTypes.string.isRequired };

export default BackIcon;
