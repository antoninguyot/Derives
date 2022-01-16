import { TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';

const LanguageIcon = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [locale, setLocale] = useState(i18n.locale);

  const toggleLanguage = () => {
    const newLocale = (i18n.locale === 'en') ? 'fr' : 'en';
    setLocale(newLocale);
    i18n.locale = newLocale;
    navigation.replace('Poem');
  };

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: insets.top,
        right: insets.right,
        marginTop: 5,
        marginRight: 5,
      }}
      onPress={toggleLanguage}
      accessibilityLabel="Langue"
      accessibilityHint="Change le langage"
      accessibilityRole="button"
    >
      {locale === 'fr'
        && <Text style={{ fontSize: 28 }}>🇬🇧</Text>
      || <Text style={{ fontSize: 28 }}>🇫🇷</Text>}
    </TouchableOpacity>
  );
};

LanguageIcon.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default LanguageIcon;
