import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CheatIcon = ({ onPress }) => {
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
      accessibilityLabel="Constuire votre expérience"
      accessibilityHint="Permet de modifier les paramètres de la Dérive"
      accessibilityRole="button"
    >
      <Ionicons name="md-cog-outline" size={32} color="darkgrey" />
    </TouchableOpacity>
  );
};

CheatIcon.propTypes = { onPress: PropTypes.func.isRequired };

export default CheatIcon;
