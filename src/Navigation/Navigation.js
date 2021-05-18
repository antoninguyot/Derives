import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import PermissionsPage from '../Pages/PermissionsPage';
import WelcomePage from '../Pages/WelcomePage';
import TextPage from '../Pages/TextPage';
import SasPage from '../Pages/SasPage';
import CreditsPage from '../Pages/CreditsPage';
import ChooseExperiencePage from '../Pages/ChooseExperiencePage';
import ChooseModePage from '../Pages/ChooseModePage';
import AudioPage from "../Pages/AudioPage";

const StackNavigator = createStackNavigator({
  Permissions: {
    screen: PermissionsPage,
    navigationOptions: {
      title: 'Avant de commencer...',
      animationEnabled: false,
      headerShown: false,
    },
  },
  WelcomeScreen: {
    screen: WelcomePage,
    navigationOptions: {
      title: 'WelcomeScreen',
      headerShown: false,
      animationEnabled: false,
    },
  },
  ChooseModeSense: {
    screen: ChooseExperiencePage,
    navigationOptions: {
      title: 'Choix du Sens de l expérience ',
      headerShown: false,
    },
  },
  ChooseMode: {
    screen: ChooseModePage,
    navigationOptions: {
      title: 'Ecran central de choix du mode',
      headerShown: false,
    },
  },
  TextGenerator: {
    screen: TextPage,
    navigationOptions: {
      title: 'Dérives',
      headerShown: false,
      animationEnabled: false,
    },
  },
  AudioPage: {
    screen: AudioPage,
    navigationOptions: {
      title: 'Dérives',
      headerShown: false,
      animationEnabled: false,
    },
  },
  Sas: {
    screen: SasPage,
    navigationOptions: {
      title: 'Dérives',
      headerShown: false,
      animationEnabled: false,
    },
  },
  Credits: {
    screen: CreditsPage,
    navigationOptions: {
      title: 'Credits',
      headerShown: false,
    },
  },
});

export default createAppContainer(StackNavigator);
