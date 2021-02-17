import {Reducer} from 'react';
import {Action, applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default (rootReducer: Reducer<any, Action<any>>) => {
  const middleware = [];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const {logger} = require('redux-logger');

    middleware.push(logger);
  }

  enhancers.push(applyMiddleware(...middleware));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);

  return {store, persistor};
};
