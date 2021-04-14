import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

const TodoItem = (props) => {
    const [timePressed, setTimesPressed] = useState(0);
    let pressed = false;
    const handlePress = () => {
        console.log();
    };
    return (
        <Pressable
            onLongPress={() => props.completedTask(props.index)}
            style={styles.items}
        >
            <View style={styles.task}>
                <TouchableOpacity
                    style={styles.circle}
                    onPress={() => props.moveUp(props.index)}
                ></TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity
                style={styles.minus}
                onPress={() => props.moveDown(props.index)}
            ></TouchableOpacity>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    items: {
        backgroundColor: '#FFF',
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
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    circle: {
        width: 25,
        height: 25,
        borderColor: 'green',
        borderWidth: 10,
        borderRadius: 5,
        marginRight: 14,
    },
    minus: {
        flexDirection: 'row',
        width: 25,
        height: 25,
        borderColor: 'red',
        borderWidth: 10,
        borderRadius: 5,
    },
});

export default TodoItem;
