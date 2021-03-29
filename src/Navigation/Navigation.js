import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import PermissionsC from '../Components/PermissionsC'
import Accueil from '../Components/Accueil'
import Texte from '../Components/Texte'
import Menu from '../Components/Menu'
import Sas from '../Components/Sas'
import Credits from '../Components/Credits'

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
      title: 'Dérives',
      headerShown: false
    }
  },
  Sas: {
    screen: Sas,
    navigationOptions: {
      title: 'Dérives',
      headerShown: false
    }
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
      headerShown: false
    }
  },
  Credits: {
    screen: Credits,
    navigationOptions: {
      title: 'Credits',
      headerShown: false,
    }
  }
})


export default createAppContainer(StackNavigator)
