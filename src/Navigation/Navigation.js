import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import PermissionsC from '../Components/PermissionsC'
import WelcomeScreen from '../Components/WelcomeScreen'
import TextGenerator from '../Components/TextGenerator'
import Sas from '../Components/Sas'
import Credits from '../Components/Credits'
import ChooseModeSense from "../Components/ChooseModeSense";
import ChooseMode from "../Components/ChooseMode";

const StackNavigator = createStackNavigator({
  Permissions: {
    screen: PermissionsC,
    navigationOptions: {
      title: 'Avant de commencer...',
      animationEnabled: false,
      headerShown: false,
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
  ChooseModeSense: {
    screen: ChooseModeSense,
    navigationOptions: {
      title: 'Choix du Sens de l expérience ',
      headerShown: false
    }
  },
  ChooseMode: {
    screen: ChooseMode,
    navigationOptions: {
      title: 'Ecran central de choix du mode',
      headerShown: false
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
  Credits: {
    screen: Credits,
    navigationOptions: {
      title: 'Credits',
      headerShown: false,
    }
  },
})


export default createAppContainer(StackNavigator)
