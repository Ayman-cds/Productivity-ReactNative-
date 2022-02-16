import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { YellowBox } from "react-native";
import MyStack from "./navigation/MyStack";
import { firebaseConfig } from "./config/FirebaseConfig";
YellowBox.ignoreWarnings(["Require cycle"]);

const store = createStore(rootReducer, applyMiddleware(thunk));

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
