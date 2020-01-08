/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import App1 from './App1';
import {name as appName} from './app.json';

import HomeNavigation from './Navigation/HomeNavigation';
import UITab from './Navigation/UITab';
import Cartitemline from './components/Cart/Cartitemline'

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App1);
