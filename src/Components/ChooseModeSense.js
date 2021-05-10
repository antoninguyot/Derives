import React from "react";
import {styles} from "../../App.css";
import { Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const ChooseModeSense = ({navigation}) => {
  return(
    <View style={[styles.containerWelcomeScreens, {flexDirection: 'column', justifyContent: 'space-around'}]}>
      <Text style={styles.textTitleW}>Choix du sens de l'expérience</Text>
      <View style={styles.containerRow}>
        <View>

          <TouchableOpacity
            style={[styles.buttonStyle,{backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
            onPress={() => {
              navigation.replace('ChooseMode', {mode: 'hybrid'})
            }}>
            <Ionicons name="camera-outline" size={48} color="white" style={{textAlign: 'center'}}/>
            <Text style={[styles.textW, {textAlign: 'center'}]}>
              Le texte apparaitra sur votre écran avec une ambiance sonore.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View>

          <TouchableOpacity
            style={[styles.buttonStyle,{backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
            onPress={() => {
              navigation.replace('ChooseMode', {mode: 'audio'})
            }}>
            <Ionicons name="headset-outline" size={48} color="white" style={{textAlign: 'center'}}/>
            <Text style={[styles.textW, {textAlign: 'center'}]}>
              Le texte vous sera dicté à l'oreille avec une ambiance sonore.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChooseModeSense;
