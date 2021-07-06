import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import ProductDetails from './Home/ProductDetails';

const Stack = createStackNavigator();

const Customer: React.FC<{}> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
      />
    </Stack.Navigator>
  );
};

export default Customer;
