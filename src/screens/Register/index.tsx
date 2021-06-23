import React, { useEffect, useState } from 'react';
import {View, Platform, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import {Firebase, firebaseErrors} from '../../services/firebase';
import {
    Text,
    Container,
    Button,
    BackgroundImage,
    Logo,
    Input,
    Wrapper,
    RegisterButton,
    RegisterButtonText,
    ContainerAvatar,
    IconAvatar,
    ImageAvatar
} from './styles';
import colors from '../../styles/colors';
import { manipulateAsync } from 'expo-image-manipulator';
import { useAuth } from '../../hooks/useAuth';
import firebase from 'firebase';

export default function Register({navigation}: any) {
    const {register} = useAuth();

    const [image, setImage] = useState(null as any);
    const [name, setName] = useState(null as any);
    const [email, setEmail] = useState(null as any);
    const [pass, setPass] = useState(null as any);
    const [repeatePass, setRepeatePass] = useState(null as any);

    const [loading, setLoading] = useState(false);

    const checkFields = () => {
        return(
            image && 
            name && name !== '' && 
            email && email !== '' && 
            pass && pass !== '' && 
            repeatePass && repeatePass !== ''
        )
    }

    const checkPass = () => {
        return(
            pass === repeatePass
        )
    }   

    const checkPassSize = () => {
        return(
            pass.length >= 6
        )
    }   

    const handleRegister = async (name: string, email: string, pass: string, photo: any) => {
        if(checkFields()) {
            if(checkPass()) {
                if(checkPassSize()) {
                    try{
                        setLoading(true);

                        const success = await register(name, email, pass, photo);

                        if(success) {
                            navigation.reset({index: 0, routes: [{name: 'Drawer'}]});
                        }

                        setLoading(false);
                    }catch(e){
                        Alert.alert('', firebaseErrors(e));
                        setLoading(false);
                    }
                }else{
                    Alert.alert('', 'Senha precisa ter pelo menos 6 characteres.');
                }
            }else{
                Alert.alert('', 'Senhas não estão iguais.');
            }
        }else{
            Alert.alert('', 'Todos campos precisam ser preenchidos e uma foto escolhida.');
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

                <ContainerAvatar
                    activeOpacity={0.7}
                    onPress={async () => {
                        if (Platform.OS !== 'web') {
                            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            if (status !== 'granted') {
                              Alert.alert('Permissão da câmera é necessária.');
                            }else{
                                let result = await ImagePicker.launchImageLibraryAsync({
                                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                                    allowsEditing: true,
                                    aspect: [1, 1],
                                    quality: 1,
                                });

                                if(!result.cancelled){
                                    setImage(result)
                                }
                            }
                        }
                    }}
                >
                    <ImageAvatar 
                        source={
                            image ? {
                                uri: image.uri
                            } :
                            require('../../imgs/no_photo.png')
                        }
                        resizeMode='cover'
                        style={image ? {borderColor: colors.green, borderWidth: 2} : {}}
                    />

                    {
                        !image && (
                            <IconAvatar name="plus" size={32} color={colors.green} />
                        )
                    }
                </ContainerAvatar>

                <Input 
                    placeholder='Nome'
                    onChangeText={(text) => setName(text)}
                    state={name ? (name !== '' ? 'correct' : 'wrong') : ''}
                />

                <Input
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                    state={email ? (email !== '' ? 'correct' : 'wrong') : ''}
                />

                <Input
                    placeholder='Senha'
                    onChangeText={(text) => setPass(text)}
                    state={pass ? (pass !== '' && pass.length >= 6 ? 'correct' : 'wrong') : ''}
                    isPass
                />

                <Input
                    placeholder='Repita a senha'
                    onChangeText={(text) => setRepeatePass(text)}
                    state={repeatePass ? (repeatePass !== '' && repeatePass.length >= 6 ? 'correct' : 'wrong') : ''}
                    isPass
                />

                <Button 
                    text='Cadastrar'
                    onPress={() => handleRegister(name, email, pass, image)}
                    disabled={loading}
                    loading={loading}
                />
            </Container>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Text>
                    Já tem uma conta?
                </Text>
                <RegisterButton 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Login')}    
                >
                    <RegisterButtonText>
                        Entre
                    </RegisterButtonText>
                </RegisterButton>
            </View>
            
        </Wrapper>
    )
}