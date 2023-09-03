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
import { BottomSheetProvider } from './src/context/bottom_sheet_context';

const App = () => {
  return (
    <Provider store={store}>
      <BottomSheetProvider>
        <StackNavigation />
      </BottomSheetProvider>
    </Provider>)
}

export default App;
