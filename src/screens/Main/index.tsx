import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import * as Location from 'expo-location';
import Header from '../../components/Header';

import {
    Text,
    Container,
    Wrapper,
    UserCoordinates
} from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useState } from 'react';

export default function Main({navigation}: any) {
    const {user} = useAuth();
    const [location, setLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('', 'Permissão para acessar local foi negada.');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    return (
        <Wrapper>
            <Header 
                onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
            />
            <Container>
                <Text>Hello world</Text>
                <UserCoordinates>Lat: {location?.coords.latitude}{'\n'}Lon: {location?.coords.longitude}</UserCoordinates>
            </Container>
        </Wrapper>
    )
}