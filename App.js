import TodoItem from './components/Todoitem';
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
    Keyboard,
} from 'react-native';

export default function App() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]);
        setTask(null);
        console.log(task);
    };
    const completedTask = (index) => {
        let itemCopy = [...taskItems];
        itemCopy.splice(index, 1);
        setTaskItems(itemCopy);
    };
    const moveUp = (index) => {
        let itemCopy = [...taskItems];
        const item = itemCopy[index];
        if (itemCopy[index - 1]) {
            itemCopy.splice(index, 1, itemCopy[index - 1]);
            itemCopy.splice(index - 1, 1, item);
            setTaskItems(itemCopy);
        }
    };
    const moveDown = (index) => {
        let itemCopy = [...taskItems];
        const item = itemCopy[index];
        if (itemCopy[index + 1]) {
            itemCopy.splice(index, 1, itemCopy[index + 1]);
            itemCopy.splice(index + 1, 1, item);
            setTaskItems(itemCopy);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Stuff To Do Today</Text>
            <View style={styles.tasksWrapper}>
                <View style={styles.items}>
                    {taskItems.map((item, index) => {
                        if (item !== null) {
                            return (
                                <TodoItem
                                    key={index}
                                    text={item}
                                    completedTask={completedTask}
                                    index={index}
                                    moveUp={moveUp}
                                    moveDown={moveDown}
                                />
                            );
                        }
                    })}
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.os === 'ios' ? 'padding' : 'height'}
                style={styles.addNewTask}
            >
                <TextInput
                    style={styles.input}
                    placeholder={'New Task'}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0D0D0',
    },
    tasksWrapper: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    titleText: {
        paddingTop: 40,
        paddingHorizontal: 10,
        fontSize: 32,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
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
});
