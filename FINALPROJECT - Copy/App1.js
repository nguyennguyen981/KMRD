import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UITab from './Navigation/UITab'
import { Provider } from 'react-redux'
import {store,peristedStore} from './store'
import {PersistGate} from 'redux-persist/es/integration/react'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={peristedStore} loading={null}>
        <UITab />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
