import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import PermissionsC from '../Components/PermissionsC'
import Accueil from '../Components/Accueil'
import Texte from '../Components/Texte'
import Menu from '../Components/Menu'
import Sas from "../Components/Sas"

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
      title: 'Accueil'
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
      title: 'Menu'
    }
  },
})


export default createAppContainer(StackNavigator)
