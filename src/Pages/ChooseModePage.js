import React, {useRef, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import ViewPager from "@react-native-community/viewpager";
import {styles} from "../../App.css";
import DropDownPicker from "react-native-dropdown-picker";
import {calculateNextMoment} from "../Helpers/time";
import {fadeTo} from "../Helpers/text";


const ChooseModePage = ({navigation}) => {
  const [moment, setMoment] = useState()
  const [localityType, setLocalityType] = useState()
  const [weather, setWeather] = useState()

  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    fadeTo(fadeAnim,1,2000)
    setTimeout(function (){
      fadeTo(fadeAnim,0,2000)
    },2000)
    setInterval(function (){
      fadeTo(fadeAnim,1,2000)
      setTimeout(function (){
        fadeTo(fadeAnim,0,2000)
      },2000)
    },4000)
  }, [])

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

  return(
    <View style={{ flex: 1 }}>
      {/* Immersive Mode*/}
      <ViewPager style={{flex:1}} initialPage={1}>
        <View style={[styles.containerWelcomeScreens, {flexDirection: 'column', justifyContent: 'space-around'}]} keys="1">
          <Text style={styles.textTitleW}>Mode Immersif</Text>
            <TouchableOpacity
              onPress={() => navigation.replace("TextGenerator")}
              style={[styles.buttonStyle,{marginHorizontal:40}]}
            >
              <Text style={[styles.textW, {textAlign:'center'}]}>Dériver</Text>
            </TouchableOpacity>
        </View>
        {/* Central Screen*/}
        <View style={styles.containerWelcomeScreens} key="2">
          <Animated.View style={{
            marginTop: 50,
            opacity: fadeAnim
          }}>
            <Text style={[styles.textW, {textAlign: 'left',marginTop:50}]}> &laquo; Mode immersif</Text>
          </Animated.View>
          <Animated.View style={{
            marginTop: 50,
            opacity: fadeAnim
          }}>
            <Text style={[styles.textW, {textAlign: 'right'}]}> Mode Manuel &raquo;</Text>
          </Animated.View>
          <View style={styles.containerButtonCredits}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Credits')}
              style={[styles.buttonStyle, {marginHorizontal:100, marginTop:300}]}>
              <Text style={[styles.textLittleW, {textAlign:'center'}]}>Crédits</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*Manual Mode*/}
        <View style={styles.containerWelcomeScreens} key="3">
          <View style={styles.containerChooseMode}>
            <Text style={styles.textTitleW}>Mode Manuel</Text>
            <View>
              <DropDownPicker zIndex={5000}
                              items={momentItems}
                              defaultValue={moment}
                              containerStyle={{height: 40, width: 250}}
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
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('TextGenerator', {
                  moment: moment,
                  localityType: localityType,
                  weather: weather
                }
              )}
              style={[styles.buttonStyle,{width:310}]}
            >
              <Text style={[styles.textW, {textAlign:'center'}]}>Dériver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ViewPager>
    </View>
  )
}

const style = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChooseModePage
