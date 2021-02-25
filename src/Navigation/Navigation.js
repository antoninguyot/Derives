import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Accueil from '../Components/Accueil'
import TextDispatcher from '../Components/TextDispatcher'

const StackNavigator = createStackNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      title: 'Accueil'
    }
  },
  Texte: {
    screen: TextDispatcher,
    navigationOptions: {
      title: null,
      headerShown: false //(cette option peut être intéressante pour enlever le bandeau supérieure qui masque une partie de l'écran)
    }
  }
})


export default createAppContainer(StackNavigator)
