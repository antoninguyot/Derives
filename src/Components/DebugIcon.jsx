import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const DebugIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      position: 'absolute',
      bottom: 0,
      right: 0,
      marginBottom: 5,
      marginRight: 5,
    }}
    onPress={onPress}
  >
    <Ionicons name="md-information-circle-outline" size={32} color="darkgrey" />
  </TouchableOpacity>
);

DebugIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default DebugIcon;
