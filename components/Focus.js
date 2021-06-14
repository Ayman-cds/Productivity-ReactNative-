import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard,
    CheckBox,
    Vibration,
    Pressable,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Pomodoro from '../Pomodoro';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-material-ui';
console.disableYellowBox = true;
function Focus(props) {
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [timing, setTiming] = useState(false);

    const getTasks = async () => {
        try {
            const jsonTasks = await AsyncStorage.getItem('tasks');
            const tasks = jsonTasks != null ? JSON.parse(jsonTasks) : [];
            setTaskItems(tasks);
            console.log(tasks);
        } catch (error) {
            console.log(error);
        }
    };
    const storeTasks = async (tasksArr) => {
        try {
            const jsonTasks = JSON.stringify(tasksArr);
            await AsyncStorage.setItem('tasks', jsonTasks);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddTask = async () => {
        Vibration.vibrate(50);
        Keyboard.dismiss();

        // if (task !== '' && task !== null && taskItems.length < 5) {
        let newTaskObj = {
            id: uuid.v4(),
            label: task,
            isChecked: false,
        };
        let newTasks = [...taskItems, newTaskObj];
        setTaskItems(newTasks);
        console.log(newTasks);
        setTask('');
        storeTasks(newTasks);
    };

    const completedTask = async (index) => {
        Vibration.vibrate(40);
        Vibration.vibrate(40);

        let itemCopy = [...taskItems];
        itemCopy.splice(index, 1);
        setTaskItems(itemCopy);
        storeTasks(taskItems);
    };

    const deleteAll = async () => {
        setTaskItems([]);
        storeTasks(taskItems);
        console.log(taskItems);
    };
    useEffect(() => {
        getTasks();
    }, []);
    const renderItem = ({ item, index, drag, isActive }) => (
        <TouchableOpacity onLongPress={() => completedTask(index)}>
            <View style={styles.item}>
                <TouchableOpacity onPressIn={drag}>
                    <FontAwesome name="bars" size={35} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}>{item.label}</Text>
                {/* <CheckBox
                    value={item.isCheked}
                    onChange={() => {
                        handleCheck(item.label);
                    }}
                /> */}
            </View>
        </TouchableOpacity>
    );

    const handleCheck = (label) => {
        let updated = [...taskItems];
        updated = updated.map((task, index) => {
            if (label === task.label) {
                return { ...task, isCheked: !task.isCheked };
            }
            return task;
        });
        setTaskItems(updated);
    };
    return (
        <View style={styles.container}>
            <Pomodoro />
            {/* <View style={{ flex: 1 }}> */}
            <DraggableFlatList
                style={styles.list}
                data={taskItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString()}
                onDragEnd={({ data }) => setTaskItems(data)}
            />
            <View>
                {/* {taskItems.length < 15 && !timing ? ( */}
                <KeyboardAvoidingView
                    behavior={Platform.os === 'ios' ? 'padding' : 'height'}
                    style={styles.addNewTask}
                >
                    <TextInput
                        style={styles.input}
                        placeholder={'New Task'}
                        placeholderTextColor="#21e6c1"
                        value={task}
                        onChangeText={(text) => setTask(text)}
                    />
                    <TouchableOpacity onPress={handleAddTask}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                {/* ) : (
                    <Text> nothing</Text>
                )} */}
                <TouchableOpacity onPress={deleteAll}>
                    <Text>DELETE </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        marginTop: 24,
        flex: 1,
    },
    list: {
        marginBottom: 100,
    },
    text: {
        paddingLeft: 10,
        alignItems: 'center',
        color: 'black',
    },
    item: {
        // backgroundColor: 'white',
        backgroundColor: '#1f4287',
        marginTop: 10,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        // justifyContent: 'flex',
    },
    container: {
        flex: 1,
        backgroundColor: '#071e3d',
        height: 10,
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

export default Focus;
