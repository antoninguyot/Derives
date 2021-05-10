import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {styles} from "../../App.css";


const ChooseParams = ({navigation}) => {
  const [moment, setMoment] = useState()
  const [localityType, setLocalityType] = useState()
  const [weather, setWeather] = useState()

  let momentItems = [
    {label: 'Matin', value: 'matin'},
    {label: 'Midi', value: 'midi'},
    {label: 'Soir', value: 'soir'},
    {label: 'Nuit', value: 'nuit'},
  ]

  let localityItems = [
    {label: 'Rural', value: 'country'},
    {label: 'Ville', value: 'city'},
  ]

  let weatherItems = [
    {label: 'Froid', value: 'cold'},
    {label: 'Tempéré', value: 'sweet'},
    {label: 'Chaud', value: 'hot'}
  ]

  return (
    <>
      <View style={styles.containerChooseParams}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TextGenerator')}
            style={styles.buttonStyle}>
            <Text style={styles.textB}>Mode immersif</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}>
            <Text style={styles.textB}>Choisir les paramètres</Text>
            <DropDownPicker zIndex={5000}
                            items={momentItems}
                            defaultValue={moment}
                            containerStyle={{height: 40}}
                            placeholder="Choisissez un moment de la journée"
                            itemStyle={{
                              justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setMoment(item.value)}
            />
            <DropDownPicker zIndex={4000}
                            items={localityItems}
                            defaultValue={localityType}
                            placeholder="Choisissez le milieu"
                            containerStyle={{height: 40, marginTop: 10}}
                            itemStyle={{
                              justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setLocalityType(item.value)}
            />
            <DropDownPicker zIndex={3000}
                            items={weatherItems}
                            defaultValue={weather}
                            placeholder="Choisissez la météo"
                            containerStyle={{height: 40, marginTop: 10}}
                            itemStyle={{
                              justifyContent: 'flex-start',
                              fontFamily:'Antonio'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setWeather(item.value)}
            />
            <TouchableOpacity onPress={() => navigation.navigate('TextGenerator', {
                moment: moment,
                localityType: localityType,
                weather: weather
              }
            )}>
              <Text style={styles.textB}>Commencer l'expérience</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerButtonCredits}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Credits')}
          style={styles.buttonCreditsStyle}>
          <Text style={styles.textLittleB}>Crédits</Text>
        </TouchableOpacity>
      </View>
    </>
  )

}

export default ChooseParams
