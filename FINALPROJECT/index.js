/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import HomeNavigation from './Navigation/HomeNavigation';
import UITab from './Navigation/UITab';

AppRegistry.registerComponent(appName, () => UITab);
