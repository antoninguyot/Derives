import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const CheatIcon = ({ onPress }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      position: 'absolute',
      top: 30,
      left: 10,
    }}
    onPress={onPress}
  >
    <Ionicons name="md-cog-outline" size={32} color="darkgrey" />
  </TouchableOpacity>
);

CheatIcon.propTypes = { onPress: PropTypes.func.isRequired };

export default CheatIcon;
