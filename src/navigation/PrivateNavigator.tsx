import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Customer from './screens/private/customer';
import Profile from './screens/private/customer/Profile';
import Seller from './screens/private/seller';

import Icon from '@app/components/Icon';
const Tab = createBottomTabNavigator();

const CustomerTab: React.FC<{}> = () => {
  const iconNames: any = {
    Home: 'Record',
    Profile: 'User',
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <Icon
              name={iconNames[route.name]}
              size={size}
              color={color}
            />
          );
        },
        title: route.name,
      })}
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'Mulish',
        },
      }}>
      <Tab.Screen name="Home" component={Customer} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const SellerTab: React.FC<{}> = () => {
  const iconNames: any = {
    Home: 'Record',
    Profile: 'User',
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <Icon
              name={iconNames[route.name]}
              size={size}
              color={color}
            />
          );
        },
        title: route.name,
      })}
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'Mulish',
        },
      }}>
      <Tab.Screen name="Home" component={Seller} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default {
  Customer: CustomerTab,
  Seller: SellerTab,
};
