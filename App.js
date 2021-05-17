import React from 'react';
import Navigation from "./src/Navigation/Navigation";
import {useFonts} from "expo-font";
import AppLoading from 'expo-app-loading';

const App = () => {
  const [loaded, error] = useFonts({
    'Antonio': require('./assets/fonts/Antonio.ttf'),
  });

  if(error){
    console.error(error)
  }

  if (!loaded) {
    return (
      <AppLoading/>
    )
  }

  return (
    <Navigation/>
  )
}

export default App
