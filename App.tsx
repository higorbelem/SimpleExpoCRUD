import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

import {AuthContextProvider} from './src/contexts/LoginContext';
import Routes from './src/routes';


export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
