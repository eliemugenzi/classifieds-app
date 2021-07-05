import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from './AppLoading';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Stack = createStackNavigator();

const Public: React.FC<{}> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AppLoading" component={AppLoading} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Public;
