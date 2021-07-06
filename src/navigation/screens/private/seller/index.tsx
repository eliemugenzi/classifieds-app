import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import ProductDetails from '../customer/Home/ProductDetails';

const Stack = createStackNavigator();

const Seller: React.FC<{}> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MyProducts" component={Home} />
      <Stack.Screen name="Product" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default Seller;
