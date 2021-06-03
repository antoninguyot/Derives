import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  Text, View, TouchableOpacity, Animated, StyleSheet
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select/src';
import { Ionicons } from '@expo/vector-icons';
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
    { value: 'été', label: 'Été' },
    { value: 'automne', label: 'Automne' },
    { value: 'printemps', label: 'Printemps' },
    { value: 'hivers', label: 'Hiver' },
  ]

  return (
    <View style={{ flex: 1 }}>
      {/* Immersive Mode */}
      <ViewPager style={{ flex: 1 }} initialPage={1}>
        <View style={[styles.containerWelcomeScreens, { flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 110 }]} keys="1">
          <Text style={styles.textTitleW}>Mode Immersif</Text>
          <Button navigation={navigation} destination="TextGenerator" text="Dériver" param={{ mode }} />
        </View>
        {/* Central Screen */}
        <View style={styles.containerWelcomeScreens} key="2">
          <Animated.View style={{
            marginTop: 50,
            opacity: fadeAnim,
          }}
          >
            <Text style={[styles.textW, { textAlign: 'left', marginTop: 50 }]}>« Mode immersif</Text>
          </Animated.View>
          <Animated.View style={{
            marginTop: 50,
            opacity: fadeAnim,
          }}
          >
            <Text style={[styles.textW, { textAlign: 'right' }]}>Construire votre expérience »</Text>
          </Animated.View>
          <View style={styles.containerButtonCredits}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Credits')}
              style={[styles.buttonStyle, { marginHorizontal: 100, marginTop: 300 }]}
            >
              <Text style={[styles.textLittleW, { textAlign: 'center' }]}>crédits</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                flex: 1, position: 'absolute', bottom: 0, left: 0, marginBottom: 5, marginLeft: 5,
              }}
              onPress={() => navigation.navigate('ChooseModeSense')}
            >
              <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Manual Mode */}
        <View style={styles.containerWelcomeScreens} key="3">
          <View style={styles.containerChooseMode}>
            <Text style={styles.textTitleW}>Construire votre expérience</Text>
            <View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                    placeholder = {{
                      label: 'Choisissez le moment de la journée',
                      value: null,
                    }}
                    items={momentItems}
                    style = {customPickerStyles}
                    onValueChange={(value) => setMoment(value)}
                  />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder = {{
                    label: 'Choisissez le milieu',
                    value: null,
                  }}
                  items={localityItems}
                  style = {customPickerStyles}
                onValueChange={(value) => setLocalityType(value)}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder = {{
                    label: 'Choisissez la météo',
                    value: null,
                  }}
                  items={weatherItems}
                  style = {customPickerStyles}
                  onValueChange={(value) => setWeather(value)}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <RNPickerSelect
                  placeholder = {{
                    label: 'Choisissez la saison',
                    value: null,
                  }}
                  items={seasonItems}
                  style = {customPickerStyles}
                  onValueChange={(value) => setSeason(value)}
                />
              </View>
            </View>
            <Button
              navigation={navigation}
              destination="TextGenerator"
              param={{
                mode, moment, localityType, weather, season
              }}
              text="Dériver"
            />
          </View>
        </View>
      </ViewPager>
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
    borderColor: 'white',
    borderRadius: 8,
    color: '#bfbfbf',
    backgroundColor: 'black',
    textAlign: 'center',
    height: 40, 
    width: 300,
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
