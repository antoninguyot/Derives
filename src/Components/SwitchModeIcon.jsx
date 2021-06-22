import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BackIcon = ({ onPress, mode }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: insets.top,
        right: insets.right,
        marginTop: 5,
        marginRight: 5,
      }}
      onPress={onPress}
      accessibilityLabel="Changer de mode"
      accessibilityHint="Passe du mode audio au mode texte et vice-versa"
      accessibilityRole="button"
    >
      {mode === 'read'
    && <Ionicons name="md-headset-outline" size={32} color="darkgrey" />
    || <Ionicons name="md-camera-outline" size={32} color="darkgrey" />}
    </TouchableOpacity>
  );
};

BackIcon.propTypes = { onPress: PropTypes.func.isRequired, mode: PropTypes.string.isRequired };

export default BackIcon;
