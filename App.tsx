/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackNavigation from './src/navigation/stack_navigation';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>)
}

export default App;
