import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TextInput,
} from 'react-native';

function AddTodo() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.os === 'ios' ? 'padding' : 'height'}
            style={styles.addNewTask}
        >
            <TextInput style={styles.input} placeholder={'New Task'} />
            <TouchableOpacity>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: 250,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderWidth: 1,
    },
    addNewTask: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    addText: {},
});

export default AddTodo;
