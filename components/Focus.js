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
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Pomodoro from '../Pomodoro';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
        <LinearGradient
            Background
            Linear
            Gradient
            colors={['#071E3D', '#278EA5', '#21E6C1']}
            style={styles.background}
        >
            <Pomodoro />
            <DraggableFlatList
                style={styles.list}
                data={taskItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString()}
                onDragEnd={({ data }) => setTaskItems(data)}
            />
            <View style={styles.textInput}>
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
                    <TouchableOpacity
                        style={styles.addWrapper}
                        onPress={handleAddTask}
                    >
                        <Text style={styles.addText}>ADD</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
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
        backgroundColor: '#39A6A3',
        marginTop: 10,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    tasksWrapper: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: 250,
        // fontFamily: 'monospace',
        backgroundColor: '#39A6A3',
        borderColor: '#00848C',
        borderRadius: 60,
        borderWidth: 1,
        height: 50,
        opacity: 0.8,
    },
    addNewTask: {
        bottom: 30,
        width: '100%',
        height: '0.5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#00848C',
        alignItems: 'center',
        padding: 5,
    },
    addWrapper: {
        width: 70,
        height: 50,
        backgroundColor: '#39A6A3',
        // padding: 20,
        borderRadius: 60,
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
