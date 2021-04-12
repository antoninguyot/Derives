import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {calculateMoment} from '../Helpers/time';
import {setColorBackground, setColorWriting} from "../Helpers/colorInterface";
import {groupStyleSheet} from "../../Appcss";
import {Ionicons} from "@expo/vector-icons";

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
  let tmp = calculateMoment()

  return (
    <>
      <View style={[styles.flexContainer, {backgroundColor: setColorBackground(tmp)}]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TextGenerator')}
            style={[styles.buttonStyle, {backgroundColor: setColorWriting(tmp)}]}>
            <Text style={[styles.textStyle, {color: setColorBackground(tmp)}]}>Mode immersif</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: setColorWriting(tmp)}]}>
            <Text style={[styles.textStyle, {color: setColorBackground(tmp)}]}>Choisir les paramètres</Text>
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
                              justifyContent: 'flex-start'
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
              <Text style={[styles.textStyle, {color: setColorBackground(tmp)}]}>Commencer l'expérience</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flexCreditsContainer, {backgroundColor: setColorBackground(tmp)}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Credits')}
          style={[styles.buttonCreditsStyle, {backgroundColor: setColorWriting(tmp)}]}>
          <Text style={[styles.textCreditsStyle, {color: setColorBackground(tmp)}]}>Crédits</Text>
        </TouchableOpacity>
      </View>
    </>
  )

}

const styles = groupStyleSheet.styleMenu

export default ChooseParams
