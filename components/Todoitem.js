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
                <TouchableOpacity style={styles.circle}></TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    items: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'flex-start',
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
    },
    circle: {
        width: 15,
        height: 15,
        borderColor: '#D0D0D0',
        borderWidth: 4,
        borderRadius: 5,
        marginRight: 14,
    },
});

export default TodoItem;
