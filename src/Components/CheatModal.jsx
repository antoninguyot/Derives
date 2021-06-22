import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet, Text, View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select/src';
import styles from '../../App.css';
import Button from './Button';
import CloseIcon from './CloseIcon';

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
    { label: 'Matin', value: 'matin' },
    { label: 'Midi', value: 'midi' },
    { label: 'Soir', value: 'soir' },
    { label: 'Nuit', value: 'nuit' },
  ];

  const localityItems = [
    { label: 'Rural', value: 'country' },
    { label: 'Ville', value: 'city' },
  ];

  const weatherItems = [
    { label: 'Froid', value: 'cold' },
    { label: 'Tempéré', value: 'sweet' },
    { label: 'Chaud', value: 'hot' },
  ];

  const seasonItems = [
    { label: 'Été', value: 'été' },
    { label: 'Automne', value: 'automne' },
    { label: 'Printemps', value: 'printemps' },
    { label: 'Hiver', value: 'hivers' },
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
            <Text style={styles.textTitleW}>Construire votre expérience</Text>
            <View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Choisissez le moment de la journée',
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
                    label: 'Choisissez le milieu',
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
                    label: 'Choisissez la météo',
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
                    label: 'Choisissez la saison',
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
              destination="TextGenerator"
              param={{
                mode,
                moment,
                localityType,
                weather,
                season,
              }}
              text="Dériver"
            />
          </View>
        </View>
        <CloseIcon onPress={close} />
      </View>
    </Modal>
  );
};

CheatModal.propTypes = {
  route: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default CheatModal;
