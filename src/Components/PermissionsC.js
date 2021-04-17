import React, {useEffect} from 'react'
import {Button, Text, View} from "react-native";
import * as Permissions from 'expo-permissions';
import {usePermissions} from 'expo-permissions';
import {styles} from "../../App.css";
import {useFonts} from "expo-font";
import {Ionicons} from "@expo/vector-icons";

const PermissionsC = ({navigation}) => {
  const [loaded] = useFonts({
    'Antonio': require('../../assets/fonts/Antonio.ttf'),
  });

  const [locationPermission, askLocationPermission] = usePermissions(Permissions.LOCATION);
  const [cameraPermission, askCameraPermission] = usePermissions(Permissions.CAMERA);

  useEffect(() => {
    if (locationPermission?.status === 'granted' && cameraPermission?.status === 'granted') {
      navigation.replace('WelcomeScreen')
    }
  }, [locationPermission, cameraPermission]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={[styles.view, {flexDirection: 'column', justifyContent: 'space-around'}]}>
      <Text style={styles.title}>Avant de commencer...</Text>
      <View style={styles.row}>
        <View>
          <Ionicons name="location-outline" size={48} color="white" style={{textAlign: 'center'}}/>
          <Text style={[styles.text, {textAlign: 'center'}]}>
            Nous avons besoin de votre position pour prendre en compte vos changements de vitesse et votre
            environnement.
          </Text>
          {(!locationPermission || locationPermission.status !== 'granted') &&
          <Button title="Autoriser" style={styles.button} onPress={askLocationPermission}/> ||
          <Button title="Autorisé" style={styles.button} disabled/>
          }
        </View>

      </View>
      <View style={styles.row}>
        <View>
          <Ionicons name="camera-outline" size={48} color="white" style={{textAlign: 'center'}}/>
          <Text style={[styles.text, {textAlign: 'center'}]}>
            Nous avons besoin de votre caméra pour vous montrer le monde qui vous entoure.
          </Text>
          {(!cameraPermission || cameraPermission.status !== 'granted') &&
          <Button title="Autoriser" style={styles.button} onPress={askCameraPermission}/> ||
          <Button title="Autorisé" style={styles.button} disabled/>
          }
        </View>
      </View>

      <View>
        {locationPermission?.status === 'granted' && cameraPermission?.status === 'granted' &&
        <Button title="Continuer" onPress={() => {
          navigation.replace('WelcomeScreen')
        }}/> ||
        <Button title="Continuer" disabled/>
        }
      </View>
    </View>
  )
}

export default PermissionsC
