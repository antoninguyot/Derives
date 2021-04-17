import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import PermissionsC from '../Components/PermissionsC'
import WelcomeScreen from '../Components/WelcomeScreen'
import TextGenerator from '../Components/TextGenerator'
import ChooseParams from '../Components/ChooseParams'
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
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      title: 'WelcomeScreen',
      headerShown: false,
      animationEnabled: false
    }
  },
  TextGenerator: {
    screen: TextGenerator,
    navigationOptions: {
      title: 'Dérives',
      headerShown: false,
      animationEnabled: false
    }
  },
  Sas: {
    screen: Sas,
    navigationOptions: {
      title: 'Dérives',
      headerShown: false,
      animationEnabled: false
    }
  },
  ChooseParams: {
    screen: ChooseParams,
    navigationOptions: {
      title: 'ChooseParams',
      headerShown: false,
      animationEnabled: false
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
