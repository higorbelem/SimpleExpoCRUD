import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { reset } from '../../services/RootNavigation';
import Button from '../Button';
import {navigate} from '../../services/RootNavigation';

import { 
    Container,
    UserInfoContainer,
    UserImage,
    UserName,
    UserNameContainer,
    Greating,
    MenuItem,
    MenuItemText,
    MenuContainer,
    Separator
} from './styles';

export default function Menu() {
    const {user, logOut} = useAuth();
    return (
        <Container>
            <UserInfoContainer>
                <UserImage 
                    source={{uri: user?.avatar}}
                />
                
                <UserNameContainer>
                    <Greating>Olá,</Greating>
                    <UserName>{user?.name}</UserName>
                </UserNameContainer>
            </UserInfoContainer>

            <Separator />

            <MenuContainer>
                <MenuItem
                    onPress={() => navigate('Register', {edit: true})}
                >
                    <MenuItemText>Editar perfil</MenuItemText>
                </MenuItem>
            </MenuContainer>

            <Button
                text='Sair'
                onPress={async () => {
                    try{
                        const success = await logOut();

                        if(success){
                            reset('Login');
                        }
                    }catch(e){
                        Alert.alert(e)
                    }
                }}
            />
        </Container>
    )
}