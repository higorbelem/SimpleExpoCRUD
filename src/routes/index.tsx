import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from '../screens/Login';
import Drawer from './drawer';
import Register from '../screens/Register';

import {navigationRef} from '../services/RootNavigation';

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
          initialRouteName={'Login'}
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Drawer" component={Drawer} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
