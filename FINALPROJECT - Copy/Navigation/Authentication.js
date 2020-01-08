import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../Screen/Loginscreen'
import SignupScreen from '../Screen/Signupscreen'

const RootStack = createStackNavigator(
  {
    Login:LoginScreen,
    Signup:SignupScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(RootStack);
