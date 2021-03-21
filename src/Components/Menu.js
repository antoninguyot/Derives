import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {calculateMoment} from '../Helpers/time';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({navigation}) => {
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
  let tmp = "nuit"
  switch (tmp) {
    case "matin" :
        return (
            <>
                <View style= {styles.flexContainerMatin}>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Texte')}
                            style={styles.buttonStyleMatin}>
                            <Text style = {styles.textStyleMatinMidi}>Mode immersif</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyleMatin}>
                            <Text style = {styles.textStyleMatinMidi}>Choisir les paramètres</Text>
                            <DropDownPicker zIndex={5000}
                                            items={momentItems}
                                            defaultValue={moment}
                                            containerStyle={{height: 40}}
                                            placeholder= "Choisissez un moment de la journée"
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setMoment(item.value)}
                            />
                            <DropDownPicker zIndex={4000}
                                            items={localityItems}
                                            defaultValue={localityType}
                                            placeholder= "Choisissez le milieu"
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
                                            placeholder= "Choisissez la météo"
                                            containerStyle={{height: 40, marginTop: 10}}
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setWeather(item.value)}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('Texte', {
                                moment: moment,
                                localityType: localityType,
                                weather: weather}
                            )} >
                                <Text style = {styles.textStyleMatinMidi}>Commencer l'expérience</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    case"midi" :
        return (
            <>
                <View style= {styles.flexContainerMidi}>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Texte')}
                            style={styles.buttonStyleMidi}>
                            <Text style = {styles.textStyleMatinMidi}>Mode immersif</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyleMidi}>
                            <Text style = {styles.textStyleMatinMidi}>Choisir les paramètres</Text>
                            <DropDownPicker zIndex={5000}
                                            items={momentItems}
                                            defaultValue={moment}
                                            containerStyle={{height: 40}}
                                            placeholder= "Choisissez un moment de la journée"
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setMoment(item.value)}
                            />
                            <DropDownPicker zIndex={4000}
                                            items={localityItems}
                                            defaultValue={localityType}
                                            placeholder= "Choisissez le milieu"
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
                                            placeholder= "Choisissez la météo"
                                            containerStyle={{height: 40, marginTop: 10}}
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setWeather(item.value)}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('Texte', {
                                moment: moment,
                                localityType: localityType,
                                weather: weather}
                            )} >
                                <Text style = {styles.textStyleMatinMidi}>Commencer l'expérience</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    case "soir" :
        return (
            <>
                <View style= {styles.flexContainerSoir}>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Texte')}
                            style={styles.buttonStyleSoir}>
                            <Text style = {styles.textStyleSoirNuit}>Mode immersif</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyleSoir}>
                            <Text style = {styles.textStyleSoirNuit}>Choisir les paramètres</Text>
                            <DropDownPicker zIndex={5000}
                                            items={momentItems}
                                            defaultValue={moment}
                                            containerStyle={{height: 40}}
                                            placeholder= "Choisissez un moment de la journée"
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setMoment(item.value)}
                            />
                            <DropDownPicker zIndex={4000}
                                            items={localityItems}
                                            defaultValue={localityType}
                                            placeholder= "Choisissez le milieu"
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
                                            placeholder= "Choisissez la météo"
                                            containerStyle={{height: 40, marginTop: 10}}
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setWeather(item.value)}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('Texte', {
                                moment: moment,
                                localityType: localityType,
                                weather: weather}
                            )} >
                                <Text style = {styles.textStyleSoirNuit}>Commencer l'expérience</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    case "nuit" :
        return (
            <>
                <View style= {styles.flexContainerNuit}>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Texte')}
                            style={styles.buttonStyleNuit}>
                            <Text style = {styles.textStyleSoirNuit}>Mode immersif</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyleNuit}>
                            <Text style = {styles.textStyleSoirNuit}>Choisir les paramètres</Text>
                            <DropDownPicker zIndex={5000}
                                            items={momentItems}
                                            defaultValue={moment}
                                            containerStyle={{height: 40}}
                                            placeholder= "Choisissez un moment de la journée"
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setMoment(item.value)}
                            />
                            <DropDownPicker zIndex={4000}
                                            items={localityItems}
                                            defaultValue={localityType}
                                            placeholder= "Choisissez le milieu"
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
                                            placeholder= "Choisissez la météo"
                                            containerStyle={{height: 40, marginTop: 10}}
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                            onChangeItem={item => setWeather(item.value)}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('Texte', {
                                moment: moment,
                                localityType: localityType,
                                weather: weather}
                            )} >
                                <Text style = {styles.textStyleSoirNuit}>Commencer l'expérience</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
  }
}

const styles = StyleSheet.create({
  textStyleMatinMidi: {
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    color: '#000'
  },
  textStyleSoirNuit: {
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    color:'#fff'
  },
  buttonStyleMatin: {
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    textAlign:'center',
    backgroundColor:'#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonStyleMidi: {
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    textAlign:'center',
    backgroundColor:'#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonStyleSoir: {
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    textAlign:'center',
    backgroundColor:'#000',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonStyleNuit: {
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    textAlign:'center',
    backgroundColor:'#000',
    borderRadius: 10,
    borderWidth: 1,
  },
  flexContainerMatin: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#FFE782'
  },
  flexContainerMidi: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#87CEEB'
  },
  flexContainerSoir: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#FF8C00'
  },
  flexContainerNuit: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#0F056B'
  }
})

export default Menu
