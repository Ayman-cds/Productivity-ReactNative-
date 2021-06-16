import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './components/MyStack';
import firebaseConfig from './components/FirebaseConfig';
import firebase from 'firebase/app';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
