import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../screens/Main';
import Menu from '../components/Menu';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator 
        initialRouteName="Home"
        drawerPosition='right'
        drawerContent={(props) => <Menu/>}
    >
        <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
  );
}
