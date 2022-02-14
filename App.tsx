import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import MyStack from "./navigation/MyStack";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = 
  ();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
    );
  }
}
