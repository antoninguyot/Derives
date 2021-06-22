import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DebugIcon = ({ onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: insets.bottom,
        right: insets.right,
        marginBottom: 5,
        marginRight: 5,
      }}
      onPress={onPress}
    >
      <Ionicons name="md-information-circle-outline" size={32} color="darkgrey" />
    </TouchableOpacity>
  );
};

DebugIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default DebugIcon;
