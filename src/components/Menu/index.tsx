import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { reset } from '../../services/RootNavigation';

import { 
    Container,
    Text,
    Button
} from './styles';

export default function Menu({navigation}: any) {
    const {logOut} = useAuth();
    return (
        <Container>
            <Button
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
            >
                <Text>Logout</Text>
            </Button>
        </Container>
    )
}