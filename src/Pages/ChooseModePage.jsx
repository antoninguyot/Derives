import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  Animated, StyleSheet, Text, TouchableOpacity, View, Modal, Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select/src';
import styles from '../../App.css';
import { fadeLoop } from '../Helpers/anim';
import Button from '../Components/Button';

const ChooseModePage = ({ route, navigation }) => {
  const [moment, setMoment] = useState();
  const [localityType, setLocalityType] = useState();
  const [weather, setWeather] = useState();
  const [season, setSeason] = useState();

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const { mode } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    const fadeInterval = fadeLoop(fadeAnim, 0, 1, 2000);
    return () => {
      clearInterval(fadeInterval);
    };
  }, []);

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
    <View style={[styles.containerWelcomeScreens, { flexDirection: 'column', justifyContent: 'space-around' }]}>
      <View style={styles.containerRow}>
        <Button navigation={navigation} destination="TextGenerator" text="Mode immersif " param={{ mode }} />
      </View>
      <View style={styles.containerRow}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={customPickerStyles.centeredView}>
            <View style={customPickerStyles.modalView}>
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
              <TouchableOpacity
                style={[styles.buttonStyle, {
                  backgroundColor: 'black', borderWidth: 1, borderColor: 'white', width: '100%',
                }]}
                onPress={() => {
                  navigation.navigate('TextGenerator', {
                    mode, moment, localityType, weather, season,
                  });
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={[styles.textTitleW, { textAlign: 'center' }]}>
                  Deriver
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.buttonStyle, {
            backgroundColor: 'black', borderWidth: 1, borderColor: 'white', width: '100%',
          }]}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={[styles.textTitleW, { textAlign: 'center' }]}>
            Choisir votre expérience
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.containerButtonCredits}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Credits')}
            style={[styles.buttonStyle, { marginHorizontal: 100, marginTop: 300 }]}
          >
            <Text style={[styles.textLittleW, { textAlign: 'center' }]}>crédits</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

ChooseModePage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default ChooseModePage;
