import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import Header from '../../components/Header';

import {
    Text,
    Container,
    Wrapper
} from './styles';
import { useAuth } from '../../hooks/useAuth';

export default function Main({navigation}: any) {
    const {user} = useAuth();
    return (
        <Wrapper>
            <Header 
                onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
            />
            <Container>
                <Text>Hello {user?.name}</Text>
            </Container>
        </Wrapper>
    )
}