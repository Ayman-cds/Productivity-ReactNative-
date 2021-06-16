import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './components/MyStack';
import FirebaseConfig from './components/FirebaseConfig';
import firebase from 'firebase/app';

if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig.FirebaseConfig);
}
export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
