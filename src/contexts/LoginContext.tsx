import React, { useEffect } from 'react';
import { useState } from 'react';
import {createContext, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';

import { Firebase } from '../services/firebase';

type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

type AuthContextType = {
    user: UserProps | undefined;
    signIn: (email: string, pass: string) => Promise<boolean>;
    logOut: () => Promise<boolean>;
    register: (name: string, email: string, pass: string, photo: any) => Promise<boolean>;
    edit: (name: string, photo: any) => Promise<boolean>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
        (async () => {
            try{
                const user = await AsyncStorage.getItem('SimpleCRUD@user');

                if(user){
                    //console.log(JSON.parse(user))
                    setUser(JSON.parse(user));
                }
            }catch(e){
                console.log(e);
            }
        })();

        /*const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log(user)
                const {displayName, photoURL, uid} = user;
    
                if(!displayName || !photoURL){
                    throw new Error('Missing information from Google Account.');
                }
        
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        });

        return () => unsubscribe();*/
    }, []);

    async function register(name: string, email: string, pass: string, photo: any) {
        //creating user
        const res = await Firebase.auth().createUserWithEmailAndPassword(email, pass);

        if(res){
            //resizing image
            const manipResult = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{resize: {height: 460, width: 460}}],
                { compress: 1, format: ImageManipulator.SaveFormat.PNG }
            );
            
            //transforming into a blob
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", manipResult.uri, true);
                xhr.send(null);
            });

            //uploading to firebase storage
            const snapshot = await Firebase.storage().ref().child(email).put(blob as Blob);
            //getting url
            const photoUrl = await snapshot.ref.getDownloadURL();

            //updating profile
            await res.user?.updateProfile({
                displayName: name,
                photoURL: photoUrl,
            });

            if(!res.user?.uid || !res.user?.email){
                throw new Error('Missing information from Google Account.');
            }

            const tempUser = {
                id: res.user?.uid,
                name: name,
                avatar: photoUrl,
                email: res.user?.email,
            }

            setUser(tempUser);

            await AsyncStorage.setItem('SimpleCRUD@user', JSON.stringify(tempUser));

            //navigation.navigate('Drawer');
            return true;
        }

        return false;
    }

    async function edit(name: string, photo: any) {
        //creating user
        
        if(user){
            let photoUrl = null;
            if(photo){
                //resizing image
                const manipResult = await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [{resize: {height: 460, width: 460}}],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
                
                //transforming into a blob
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function (e) {
                        console.log(e);
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", manipResult.uri, true);
                    xhr.send(null);
                });

                //uploading to firebase storage
                const snapshot = await Firebase.storage().ref().child(user.email).put(blob as Blob);
                //getting url
                photoUrl = await snapshot.ref.getDownloadURL();
            }
            
            await Firebase.auth().currentUser?.updateProfile({
                displayName: name,
                photoURL: photoUrl
            });

            if(!user.name || !user.email){
                throw new Error('Missing information from Google Account.');
            }
            
            const tempUser = {
                id: user.id,
                name: name ? name : user.name,
                avatar: photoUrl ? photoUrl : user.avatar,
                email: user.email,
            }

            setUser(tempUser);

            await AsyncStorage.setItem('SimpleCRUD@user', JSON.stringify(tempUser));

            return true;
        }

        return false;
    }

    async function signIn(email: string, pass: string) {
        const res = await Firebase.auth().signInWithEmailAndPassword(email, pass);

        if(res.user){
            const {displayName, photoURL, uid, email} = res.user;

            if(!displayName || !photoURL || !email){
                throw new Error('Missing information from Google Account.');
            }

            const tempUser = {
                id: uid,
                name: displayName,
                avatar: photoURL,
                email: email,
            }

            setUser(tempUser);

            await AsyncStorage.setItem('SimpleCRUD@user', JSON.stringify(tempUser));

            return true;
        }
        
        return false;
    }

    async function logOut() {
        setUser(undefined);

        await AsyncStorage.removeItem('SimpleCRUD@user');
        
        return true;
    }

    return(
        <AuthContext.Provider value={{user, signIn, logOut, register, edit}}>
            {children}
        </AuthContext.Provider>
    )
} 