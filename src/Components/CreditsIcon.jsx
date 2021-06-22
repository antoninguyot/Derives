import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CreditsIcon = ({ onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: insets.bottom,
        left: insets.left,
        marginBottom: 5,
        marginLeft: 5,
      }}
      onPress={onPress}
      accessibilityLabel="Crédits"
      accessibilityHint="Affiche les crédits dans une nouvelle fenêtre"
      accessibilityRole="button"
    >
      <Ionicons name="md-people-outline" size={32} color="darkgrey" />
    </TouchableOpacity>
  );
};

CreditsIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default CreditsIcon;
