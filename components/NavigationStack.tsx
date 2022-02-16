import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
const Stack = createNativeStackNavigator();
const NavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
export default NavigationStack;
