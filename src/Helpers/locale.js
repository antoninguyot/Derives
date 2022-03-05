import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import localeEn from '../../assets/locales/en.json';
import localeFr from '../../assets/locales/fr.json';

const trimLocale = function trimLocale(locale) {
  return locale.indexOf('-') === -1
    ? locale
    : locale.substring(0, locale.indexOf('-'));
};

export const setLocale = (locale) => {
  i18n.locale = locale || trimLocale(Localization.locale);
};

export const initLocale = () => {
  i18n.translations = {
    en: localeEn,
    fr: localeFr,
  };

  // Set the locale once at the beginning of your app.
  setLocale();
  i18n.fallbacks = true;
};

export const localizeContentFromObject = (object) => {
  switch (i18n.locale) {
    case 'fr':
      return object.fr;
    case 'en':
    default:
      return object.en;
  }
};
