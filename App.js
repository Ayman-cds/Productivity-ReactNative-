import TodoItem from './components/Todoitem';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard,
    Vibration,
    Pressable,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { storeTasks, getTasks } from './localStorage';
import Focus from './components/Focus';

class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Focus />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#071e3d',
    },
    tasksWrapper: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    titleText: {
        paddingTop: 50,
        paddingHorizontal: 20,
        fontSize: 40,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#000',
        justifyContent: 'center',
    },
    input: {
        color: '#21e6c1',
        opacity: 0.7,
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: 250,
        fontFamily: 'monospace',
        backgroundColor: '#071e3d',
        borderColor: '#00848C',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
    },
    addNewTask: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#00848C',
        alignItems: 'center',
        padding: 15,
    },
    addWrapper: {
        width: 80,
        height: 50,
        backgroundColor: '#071e3d',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00848C',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    addText: {
        color: '#21e6c1',
    },
});
export default App;
