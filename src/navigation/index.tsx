import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Public from './screens/public';
import Private from './PrivateNavigator';

const Stack = createStackNavigator();

const MainNavigator: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Public" component={Public} />
        <Stack.Screen name="Customer" component={Private.Customer} />
        <Stack.Screen name="Seller" component={Private.Seller} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
