import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Userscreen from '../Screen/Userscreen'
import Historyscreen from '../Screen/Historyscreen'

const RootStack = createStackNavigator(
  {
    MainProfile:Userscreen,
    History:Historyscreen,
  },
  {
    initialRouteName: 'MainProfile',
    headerMode: 'none',
    navigationOptions: {
       headerVisible: false,
   },
  }
);

export default createAppContainer(RootStack);
