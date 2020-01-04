import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createTabsNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from '../Screen/Homescreen'
import Searchscreen from '../Screen/Searchscreen'
import Productscreen from '../Screen/Productscreen'

const RootStack = createStackNavigator(
  {
    Home: Homescreen,
    Product: Productscreen,
    Search:Searchscreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
       headerVisible: false,
   },
  }
);

export default createAppContainer(RootStack);
