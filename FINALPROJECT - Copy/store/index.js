import { createStore, combineReducers } from 'redux'
import rootReducer from '../reducers/'
import {persistStore,persistReducer} from 'redux-persist'
import {AsyncStorage} from 'react-native';

const persistConfig ={
  key:'root',
  storage:AsyncStorage,
  whitelist:['cartItems','userData']
}

const persitedReducer = persistReducer(persistConfig,rootReducer);

export const store = createStore(persitedReducer);
export const peristedStore = persistStore(store);
