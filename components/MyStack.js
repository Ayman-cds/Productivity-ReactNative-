import { createStackNavigator } from '@react-navigation/stack';
import Focus from './Focus';
import Home from './Home';
import React from 'react';
import Login from './Login';
const Stack = createStackNavigator();
const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Focus" component={Focus} />
        </Stack.Navigator>
    );
};
export default MyStack;
