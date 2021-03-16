import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Navigation from "./src/Navigation/Navigation";

export default class AppTest extends React.Component {

  render() {
    return (
      <Navigation/>
    )
  }
}

const stylesNavigation = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20 //this amount should be equal to the header height so that any items displayed inside the container will start after the absolute positioned header
  },
});