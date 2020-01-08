import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Cartscreen from '../Screen/Cartscreen'
import Paymentscreen from '../Screen/Paymentscreen'

const RootStack = createStackNavigator(
  {
    Cartscreen:{
      screen:Cartscreen,
    },
    Payment:Paymentscreen,
  },
  {
    initialRouteName: 'Cartscreen',
    headerMode: 'none',
    navigationOptions: {
       headerVisible: false,
   },
  },
);

export default createAppContainer(RootStack);
