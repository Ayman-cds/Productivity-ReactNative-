import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './components/MyStack';

import Home from './components/Home';
import Focus from './components/Focus';
export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
