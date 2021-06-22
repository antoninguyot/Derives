import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CloseIcon = ({ onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: insets.top,
        left: insets.left,
        marginTop: 5,
        marginLeft: 5,
      }}
      onPress={onPress}
      accessibilityLabel="Fermer"
      accessibilityHint="Ferme la fenêtre"
      accessibilityRole="button"
    >
      <Ionicons name="md-close-circle-outline" size={32} color="darkgrey" />
    </TouchableOpacity>
  );
};

CloseIcon.propTypes = { onPress: PropTypes.func.isRequired };

export default CloseIcon;
