import { createStackNavigator } from '@react-navigation/stack';
import Focus from './Focus';
import Home from './Home';
import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { Pomodoro } from '../Pomodoro';
const Stack = createStackNavigator();
const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Focus" component={Focus} />
        </Stack.Navigator>
    );
};
export default MyStack;
