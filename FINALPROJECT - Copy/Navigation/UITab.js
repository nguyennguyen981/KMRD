import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeNavigation from './HomeNavigation'
import Authenanduser from './Authenanduser'
import PaymentStack from './PaymentStack'
import Aboutscreen from '../Screen/Aboutscreen'

const RootStack = createBottomTabNavigator(
  {
    Main: HomeNavigation,
    Cart: PaymentStack,
    User:Authenanduser,
    About:Aboutscreen,
  },
  {initialRouteName:'Main'
   }
);

const AppContainer = createAppContainer(RootStack);

export default class UITab extends React.Component {
  render() {
    return <AppContainer />;
  }
}
