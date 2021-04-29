import React from 'react';
import Navigation from "./src/Navigation/Navigation";
import {useFonts} from "expo-font";
import {Text, View} from "react-native";

const App = () => {
  const [loaded] = useFonts({
    'Antonio': require('./assets/fonts/Antonio.ttf'),
  });

  if (!loaded) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    )
  }

  return (
    <Navigation/>
  )
}

export default App
