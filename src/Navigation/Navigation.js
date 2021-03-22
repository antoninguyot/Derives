import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import PermissionsC from '../Components/PermissionsC'
import Accueil from '../Components/Accueil'
import Texte from '../Components/Texte'
import Menu from '../Components/Menu'

const StackNavigator = createStackNavigator({
  Permissions: {
    screen: PermissionsC,
    navigationOptions: {
      title: 'Avant de commencer...',
      animationEnabled: false
    }
  },
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      title: 'Accueil',
      headerShown: false
    }
  },
  Texte: {
    screen: Texte,
    navigationOptions: {
      title: null,
      headerShown: false //(cette option peut être intéressante pour enlever le bandeau supérieure qui masque une partie de l'écran)
    }
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
      headerShown: false
    }
  },
})


export default createAppContainer(StackNavigator)
