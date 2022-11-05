import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Modal, SafeAreaView, ScrollView,
  Text, View,
} from 'react-native';
import * as Device from 'expo-device';
import i18n from 'i18n-js';
import { Picker } from '@react-native-picker/picker';
import styles from '../../App.css';
import Button from './Button';
import CloseIcon from './CloseIcon';
import LanguageIcon from './LanguageIcon';

const pickerStyles = {
  color: 'white',
  height: 100,
};

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
      <ScrollView contentContainerStyle={[{ backgroundColor: 'black' }, Device.osName === 'Android' && { flex: 1, flexGrow: 1 }]}>
        <SafeAreaView>
          <View style={{ padding: 30 }}>
            <Text style={[styles.textTitleW, { paddingVertical: 30 }]}>{i18n.t('cheat.title')}</Text>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: 'white' }}>{i18n.t('cheat.chooseMoment')}</Text>
              <Picker
                style={{ color: 'white' }}
                itemStyle={pickerStyles}
                onValueChange={setMoment}
                selectedValue={moment}
              >
                {momentItems.map((item) => (
                  <Picker.Item label={item.label} value={item.value} key={item.value} />
                ))}
              </Picker>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: 'white' }}>{i18n.t('cheat.chooseLocality')}</Text>
              <Picker
                style={{ color: 'white' }}
                itemStyle={pickerStyles}
                onValueChange={setLocalityType}
                selectedValue={localityType}
              >
                {localityItems.map((item) => (
                  <Picker.Item label={item.label} value={item.value} key={item.value} />
                ))}
              </Picker>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: 'white' }}>{i18n.t('cheat.chooseWeather')}</Text>
              <Picker
                style={{ color: 'white' }}
                itemStyle={pickerStyles}
                onValueChange={setWeather}
                selectedValue={weather}
              >
                {weatherItems.map((item) => (
                  <Picker.Item label={item.label} value={item.value} key={item.value} />
                ))}
              </Picker>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: 'white' }}>{i18n.t('cheat.chooseSeason')}</Text>
              <Picker
                style={{ color: 'white' }}
                itemStyle={pickerStyles}
                onValueChange={setSeason}
                selectedValue={season}
              >
                {seasonItems.map((item) => (
                  <Picker.Item label={item.label} value={item.value} key={item.value} />
                ))}
              </Picker>
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
        </SafeAreaView>
        <CloseIcon onPress={close} />
        <LanguageIcon navigation={navigation} />
      </ScrollView>
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
