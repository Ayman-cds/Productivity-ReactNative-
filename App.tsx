import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { View, Text, LogBox } from "react-native";
import { firebaseConfig } from "./config/FirebaseConfig";
import NavigationStack from "./components/NavigationStack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
const Stack = createStackNavigator();
LogBox.ignoreLogs(["Require cycle"]);

// const store = createStore(rootReducer, applyMiddleware(thunk));

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>BRUHHHHH</Text>
    // </View>
  );
}
