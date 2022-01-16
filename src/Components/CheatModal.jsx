import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet, Text, View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select/src';
import i18n from 'i18n-js';
import styles from '../../App.css';
import Button from './Button';
import CloseIcon from './CloseIcon';
import LanguageIcon from './LanguageIcon';

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRadius: 8,
    color: '#bfbfbf',
    backgroundColor: 'black',
    textAlign: 'center',
    height: 40,
    width: 300,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRadius: 8,
    color: '#bfbfbf',
    backgroundColor: 'black',
    textAlign: 'center',
    height: 40,
    width: 300,
  },
});

const CheatModal = ({
  route, navigation, close, visible,
}) => {
  const [moment, setMoment] = useState();
  const [localityType, setLocalityType] = useState();
  const [weather, setWeather] = useState();
  const [season, setSeason] = useState();

  const { mode } = route.params;

  const momentItems = [
    { label: i18n.t('moments.morning'), value: 'matin' },
    { label: i18n.t('moments.noon'), value: 'midi' },
    { label: i18n.t('moments.evening'), value: 'soir' },
    { label: i18n.t('moments.night'), value: 'nuit' },
  ];

  const localityItems = [
    { label: i18n.t('localities.country'), value: 'country' },
    { label: i18n.t('localities.city'), value: 'city' },
  ];

  const weatherItems = [
    { label: i18n.t('weather.cold'), value: 'cold' },
    { label: i18n.t('weather.sweet'), value: 'sweet' },
    { label: i18n.t('weather.hot'), value: 'hot' },
  ];

  const seasonItems = [
    { label: i18n.t('seasons.summer'), value: 'été' },
    { label: i18n.t('seasons.autumn'), value: 'automne' },
    { label: i18n.t('seasons.spring'), value: 'printemps' },
    { label: i18n.t('seasons.winter'), value: 'hiver' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.containerWelcomeScreens}>
          <View style={styles.containerChooseMode}>
            <Text style={styles.textTitleW}>{i18n.t('cheat.title')}</Text>
            <View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder={{
                    label: i18n.t('cheat.chooseMoment'),
                    value: null,
                  }}
                  items={momentItems}
                  style={customPickerStyles}
                  onValueChange={(value) => setMoment(value)}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder={{
                    label: i18n.t('cheat.chooseLocality'),
                    value: null,
                  }}
                  items={localityItems}
                  style={customPickerStyles}
                  onValueChange={(value) => setLocalityType(value)}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder={{
                    label: i18n.t('cheat.chooseWeather'),
                    value: null,
                  }}
                  items={weatherItems}
                  style={customPickerStyles}
                  onValueChange={(value) => setWeather(value)}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder={{
                    label: i18n.t('cheat.chooseSeason'),
                    value: null,
                  }}
                  items={seasonItems}
                  style={customPickerStyles}
                  onValueChange={(value) => setSeason(value)}
                />
              </View>
            </View>
            <Button
              navigation={navigation}
              destination="Poem"
              param={{
                mode,
                moment,
                localityType,
                weather,
                season,
              }}
              text={i18n.t('cheat.start')}
            />
          </View>
        </View>
        <CloseIcon onPress={close} />
        <LanguageIcon navigation={navigation} />
      </View>
    </Modal>
  );
};

CheatModal.propTypes = {
  route: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default CheatModal;
