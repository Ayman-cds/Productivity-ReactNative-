import { createStackNavigator } from '@react-navigation/stack';
import Focus from './Focus';
import Home from './Home';
import React from 'react';
import Login from './Login';
import Signup from './Signup';
const Stack = createStackNavigator();
const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            // cardOverlayEnabled="true"
            // animation="timing"
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Focus" component={Focus} />
        </Stack.Navigator>
    );
};
export default MyStack;
