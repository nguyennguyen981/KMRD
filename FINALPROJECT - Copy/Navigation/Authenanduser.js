import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import Userscreen from '../Screen/Userscreen';
import Authentication from './Authentication';
import ProfileStack from './ProfileStack';

const RootStack = createSwitchNavigator(
  {
    Authentication:Authentication,
    Profile:ProfileStack,
  },
  {
    initialRouteName: 'Authentication',
  },
);

export default createAppContainer(RootStack);
