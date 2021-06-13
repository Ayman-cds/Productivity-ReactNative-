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

import { storeTasks, getTasks } from './localStorage';
import Pomodoro from './Pomodoro';
import Focus from './components/Focus';

class App extends Component {
    constructor() {
        super();
        this.getTasks();
        this.state = {
            task: '',
            taskItems: [],
            timing: false,
        };
        if (this.state.taskItems > 4) {
            this.setState({ timing: true });
        }
    }

    getTasks = async () => {
        try {
            const jsonTasks = await AsyncStorage.getItem('tasks');
            const tasks = jsonTasks != null ? JSON.parse(jsonTasks) : [];
            this.setState({ taskItems: tasks });
        } catch (error) {
            console.log(error);
        }
    };
    storeTasks = async (tasksArr) => {
        try {
            const jsonTasks = JSON.stringify(tasksArr);
            await AsyncStorage.setItem('tasks', jsonTasks);
        } catch (error) {
            console.log(error);
        }
    };

    handleAddTask = async () => {
        Vibration.vibrate(50);
        Keyboard.dismiss();

        console.log(this.state.taskItems);
        if (
            this.state.task !== '' &&
            this.state.tasks !== null &&
            this.state.taskItems.length < 5
        ) {
            let newTasks = [...this.state.taskItems, this.state.task];
            this.setState({ taskItems: newTasks });
            this.setState({ task: '' });
            this.storeTasks(newTasks);
        }
    };

    completedTask = async (index) => {
        Vibration.vibrate(40);
        Vibration.vibrate(40);

        let itemCopy = [...this.state.taskItems];
        itemCopy.splice(index, 1);
        this.setState({ taskItems: itemCopy });
        this.storeTasks(this.state.taskItems);
    };
    moveUp = (index) => {
        Vibration.vibrate(10);

        let itemCopy = [...this.state.taskItems];
        const item = itemCopy[index];
        if (itemCopy[index - 1]) {
            itemCopy.splice(index, 1, itemCopy[index - 1]);
            itemCopy.splice(index - 1, 1, item);
            this.setState({ taskItems: itemCopy });
        }
        this.storeTasks(this.state.taskItems);
    };
    moveDown = (index) => {
        Vibration.vibrate(10);

        let itemCopy = [...this.state.taskItems];
        const item = itemCopy[index];
        if (itemCopy[index + 1]) {
            itemCopy.splice(index, 1, itemCopy[index + 1]);
            itemCopy.splice(index + 1, 1, item);
            this.setState({ taskItems: itemCopy });
        }
        this.storeTasks(this.state.taskItems);
    };
    render() {
        return (
            <View style={styles.container}>
                {/* <ScrollView>
                    <Pressable
                        onLongPress={() => this.setState({ timing: false })}
                    ></Pressable>
                    <View style={styles.tasksWrapper}>
                        <View style={styles.items}>
                            {this.state.taskItems ? (
                                this.state.taskItems.map((item, index) => {
                                    if (item !== null) {
                                        return (
                                            <TodoItem
                                                key={index}
                                                text={item}
                                                completedTask={
                                                    this.completedTask
                                                }
                                                index={index}
                                                moveUp={this.moveUp}
                                                moveDown={this.moveDown}
                                            />
                                        );
                                    }
                                })
                            ) : (
                                <Text> NOTHING TO SEE HERE</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
                {this.state.taskItems.length < 5 && !this.state.timing ? (
                    <KeyboardAvoidingView
                        behavior={Platform.os === 'ios' ? 'padding' : 'height'}
                        style={styles.addNewTask}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder={'New Task'}
                            placeholderTextColor="#21e6c1"
                            value={this.state.task}
                            onChangeText={(text) =>
                                this.setState({ task: text })
                            }
                        />
                        <TouchableOpacity onPress={() => this.handleAddTask()}>
                            <View style={styles.addWrapper}>
                            c<Text style={styles.addText}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                ) : ( )} */}
                <Pomodoro />
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
