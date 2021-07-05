// React
import React from 'react';
import {Provider as AtomProvider} from 'jotai';
import Toast from 'react-native-toast-message';

import MainNavigator from './src/navigation';

const App = () => {
  return (
    <AtomProvider>
      <MainNavigator />
      <Toast ref={ref => Toast.setRef(ref)} />
    </AtomProvider>
  );
};

export default App;
