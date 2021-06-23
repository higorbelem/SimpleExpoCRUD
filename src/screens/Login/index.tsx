import React, {useState} from 'react';

import {Alert, View} from 'react-native';

import {
    Text,
    Container,
    Button,
    BackgroundImage,
    Logo,
    Input,
    Wrapper,
    RegisterButton,
    RegisterButtonText
} from './styles';
import { Firebase, firebaseErrors } from '../../services/firebase';
import {useAuth} from '../../hooks/useAuth';
import { useEffect } from 'react';

export default function Login({navigation}: any) {
    const [email, setEmail] = useState(null as any);
    const [pass, setPass] = useState(null as any);
    const {signIn, user} = useAuth();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user){
            navigation.reset({index: 0, routes: [{name: 'Drawer'}]});
        }
    }, [user]);

    const checkFields = () => {
        return(
            email && email !== '' && 
            pass && pass !== ''
        )
    }

    const handleLogin = async (email: string, pass: string) => {
        if(checkFields()){
            try{
                setLoading(true);
                const success = await signIn(email, pass);
    
                /*if(success){
                    navigation.reset({index: 0, routes: [{name: 'Drawer'}]});
                }*/
                setLoading(false);
            }catch(e){
                Alert.alert('', firebaseErrors(e));
                setLoading(false);
            }
        }else{
            Alert.alert('', 'Todos campos precisam ser preenchidos.');
        }
    }

    return (
        <Wrapper>
            <BackgroundImage 
                source={require('../../imgs/login_background.jpg')}
                resizeMode='cover'
            />

            <Container>
                <Logo 
                    source={require('../../imgs/logo.png')}
                    resizeMode='contain'
                />

                <Input
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                    state={email ? (email !== '' ? 'correct' : 'wrong') : ''}
                />

                <Input
                    placeholder='Senha'
                    onChangeText={(text) => setPass(text)}
                    state={pass ? (pass !== '' ? 'correct' : 'wrong') : ''}
                    isPass
                />

                <Button 
                    text='Entrar'
                    onPress={() => handleLogin(email, pass)}
                    disabled={loading}
                    loading={loading}
                />
            </Container>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Text>
                    Não tem uma conta?
                </Text>
                <RegisterButton 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Register')}    
                >
                    <RegisterButtonText>
                        Cadastre-se
                    </RegisterButtonText>
                </RegisterButton>
            </View>
            
        </Wrapper>
    )
}