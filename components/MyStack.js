import { createStackNavigator } from '@react-navigation/stack';
import Focus from './Focus';
import Home from './Home';
import React from 'react';
const Stack = createStackNavigator();
const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Focus" component={Home} />
            <Stack.Screen name="Home" component={Focus} />
        </Stack.Navigator>
    );
};
export default MyStack;
