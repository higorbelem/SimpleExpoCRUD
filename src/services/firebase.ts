import firebase from 'firebase/app';
import Constants from 'expo-constants';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: Constants.manifest.extra?.apiKey,
    authDomain: Constants.manifest.extra?.authDomain,
    projectId: Constants.manifest.extra?.projectId,
    storageBucket: Constants.manifest.extra?.storageBucket,
    messagingSenderId: Constants.manifest.extra?.messagingSenderId,
    appId: Constants.manifest.extra?.appId,
};

export const firebaseErrors = (error: string) => {
    error = JSON.stringify(error);
    if(!error) return 'Algum erro ocorreu';
    if(error.includes('auth/too-many-requests')) return 'Tentativas esgotadas, tente novamente mais tarde';
    if(error.includes('auth/user-not-found')) return 'Email não cadastrado';
    if(error.includes('auth/email-already-in-use')) return 'Email já cadastrado';
    if(error.includes('auth/wrong-password')) return 'Senha incorreta';
    if(error.includes('email') && error.includes('badly') && error.includes('formatted')) return 'Formato do email incorreto';
    return error;

}

export const Firebase = firebase.initializeApp(firebaseConfig);
