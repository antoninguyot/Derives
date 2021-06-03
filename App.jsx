import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PermissionsPage from './src/Pages/PermissionsPage';
import WelcomePage from './src/Pages/WelcomePage';
import ChooseExperiencePage from './src/Pages/ChooseExperiencePage';
import ChooseModePage from './src/Pages/ChooseModePage';
import PoemPage from './src/Pages/PoemPage';
import CreditsPage from './src/Pages/CreditsPage';
import { calculateMoment } from './src/Helpers/time';

const App = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [firstTimeOpened, setFirstTimeOpened] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if we need to redirect to the permissions screen
    (async () => {
      const { status: cameraStatus } = await Camera.getPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');
      const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(locationStatus === 'granted');
    })();

    // Check if this is the first time we open the app
    (async () => {
      const firstOpenedAtKey = 'firstOpenedAt';
      const firstOpenedAt = await AsyncStorage.getItem(firstOpenedAtKey);
      if (firstOpenedAt !== null) {
        await AsyncStorage.setItem(firstOpenedAtKey, Date.now().toString());
      }
      setFirstTimeOpened(firstOpenedAt === null);
    })();
  }, []);

  /**
   * Determines if the app is ready to start
   */
  useEffect(() => {
    if (
      typeof cameraPermission === 'boolean'
      && typeof locationPermission === 'boolean'
      && typeof firstTimeOpened === 'boolean'
    ) {
      setLoaded(true);
    }
  });

  if (!loaded) {
    return <AppLoading />;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <>
          {(!locationPermission || !cameraPermission) && (
            <Stack.Screen name="Permissions" component={PermissionsPage} />
          )}
          {firstTimeOpened && (
            <Stack.Screen name="WelcomeScreen" component={WelcomePage} options={{ animationEnabled: false }} />
          )}
          <Stack.Screen name="ChooseModeSense" component={ChooseExperiencePage} options={{ animationEnabled: false }} />
          <Stack.Screen name="ChooseMode" component={ChooseModePage} options={{ animationEnabled: false }} />
          <Stack.Screen
            name="TextGenerator"
            component={PoemPage}
            initialParams={{
              localityType: null,
              moment: calculateMoment(),
              weather: null,
              mode: 'read',
            }}
            options={{ animationEnabled: false }}
          />
          <Stack.Screen name="Credits" component={CreditsPage} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
