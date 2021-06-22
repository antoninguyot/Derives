import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  Button, Linking, Platform, Text, View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as IntentLauncher from 'expo-intent-launcher';
import styles from '../../App.css';

const PermissionsPage = ({ navigation }) => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  /**
   * Get required permissions statuses
   * @returns {Promise<void>}
   */
  const getCurrentPermissions = async () => {
    setCameraPermission(await Camera.getPermissionsAsync());
    setLocationPermission(await Location.getForegroundPermissionsAsync());
  };

  /**
   * Get new permissions if the user has left the app
   */
  const handleAppStateChange = () => {
    if (AppState.currentState === 'active') {
      getCurrentPermissions();
    }
  };

  /**
   * Get permissions during screen loading
   */
  useEffect(() => {
    getCurrentPermissions();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  /**
   * Determines what is the next screen if
   * this isn't the first time the app is opened
   * @returns {Promise<void>}
   * @private
   */
  const navigateToNextPage = async () => {
    const firstOpenedAtKey = 'firstOpenedAt';
    const firstOpenedAt = await AsyncStorage.getItem(firstOpenedAtKey);
    if (firstOpenedAt !== null) {
      navigation.replace('TextGenerator');
    } else {
      await AsyncStorage.setItem(firstOpenedAtKey, Date.now()
        .toString());
      navigation.replace('WelcomeScreen');
    }
  };

  const askLocationPermission = async () => {
    setLocationPermission(await Location.requestForegroundPermissionsAsync());
  };

  const askCameraPermission = async () => {
    setCameraPermission(await Camera.requestPermissionsAsync());
  };

  /**
   * Redirects the user to the notification section in settings
   * @returns {Promise<void>}
   */
  const redirectToNotificationSettings = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings://');
    } else if (Platform.OS === 'android') {
      await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APP_NOTIFICATION_SETTINGS);
    }
  };

  /**
   * Redirects the user to the camera section in settings
   * @returns {Promise<void>}
   */
  const redirectToCameraSettings = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings://');
    } else if (Platform.OS === 'android') {
      await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS);
    }
  };

  /**
   * Navigate to the next screen if both permissions are granted
   */
  useEffect(() => {
    if (locationPermission && locationPermission.granted
      && cameraPermission && cameraPermission.granted) {
      navigateToNextPage();
    }
  }, [locationPermission, cameraPermission]);

  return (
    <View style={[styles.containerWelcomeScreens, {
      flexDirection: 'column',
      justifyContent: 'space-around',
    }]}
    >
      <Text style={styles.textTitleW}>Avant de commencer...</Text>
      <View style={styles.containerRow}>
        <View>
          <Ionicons
            name="location-outline"
            size={48}
            color="white"
            style={{ textAlign: 'center' }}
          />
          <Text style={[styles.textW, { textAlign: 'center' }]}>
            Nous avons besoin de votre position pour prendre en compte vos changements de vitesse
            et votre environnement.
          </Text>
          {locationPermission === null && <Button title="Chargement..." disabled />
          // Si la permission est déjà donnée
          || locationPermission.granted && <Button title="Autorisé" disabled />
          // Si l'utilisateur a refusé, il doit autoriser dans les réglages
          || !locationPermission.canAskAgain
          && <Button title="Autoriser dans les réglages" onPress={redirectToNotificationSettings} />
          || <Button title="Autoriser" onPress={askLocationPermission} />}
        </View>
      </View>
      <View style={styles.containerRow}>
        <View>
          <Ionicons name="camera-outline" size={48} color="white" style={{ textAlign: 'center' }} />
          <Text style={[styles.textW, { textAlign: 'center' }]}>
            Nous avons besoin de votre caméra pour vous montrer le monde qui vous entoure.
          </Text>
          {cameraPermission === null && <Button title="Chargement..." disabled />
          // Si la permission est déjà donnée
          || cameraPermission.granted && <Button title="Autorisé" disabled />
          // Si l'utilisateur a refusé, il doit autoriser dans les réglages
          || !cameraPermission.canAskAgain
          && <Button title="Autoriser dans les réglages" onPress={redirectToCameraSettings} />
          || <Button title="Autoriser" onPress={askCameraPermission} />}
        </View>
      </View>

      <View>
        {locationPermission && locationPermission.granted
        && cameraPermission && cameraPermission.granted
        && (
          <Button
            title="Continuer"
            onPress={navigateToNextPage}
          />
        )
        || <Button title="Continuer" disabled />}
      </View>
    </View>
  );
};

PermissionsPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default PermissionsPage;
