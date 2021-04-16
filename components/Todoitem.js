import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

const TodoItem = (props) => {
    return (
        <Pressable
            onLongPress={() => props.completedTask(props.index)}
            style={styles.items}
        >
            <View style={styles.task}>
                <TouchableOpacity
                    style={styles.increasePriority}
                    onPress={() => props.moveUp(props.index)}
                ></TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity
                style={styles.reducePriority}
                onPress={() => props.moveDown(props.index)}
            ></TouchableOpacity>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    items: {
        backgroundColor: '#B5FBDD',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 21,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    reducePriority: {
        flexDirection: 'row',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderBottomWidth: 20,
        borderLeftColor: '#FE634E',
        borderRightColor: '#FE634E',
        borderBottomColor: '#FE634E',
        transform: [{ rotate: '180deg' }],
        margin: 0,
        marginLeft: -6,
        borderWidth: 0,
        borderColor: 'transparent',
    },
    increasePriority: {
        flexDirection: 'row',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderBottomWidth: 20,
        borderLeftColor: '#117243',
        borderRightColor: '#117243',
        borderBottomColor: '#117243',
        transform: [{ rotate: '0deg' }],
        margin: 0,
        marginLeft: -6,
        marginRight: 10,
        borderWidth: 0,
        borderColor: 'transparent',
    },
});

export default TodoItem;
