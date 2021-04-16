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
    TouchableHighlightBase,
    Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeTasks, getTasks } from './localStorage';

class App extends Component {
    constructor() {
        super();
        this.getTasks();
        this.state = {
            task: '',
            taskItems: [],
        };
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
                <Text style={styles.titleText}>Five Task Focus</Text>
                <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                        {this.state.taskItems ? (
                            this.state.taskItems.map((item, index) => {
                                if (item !== null) {
                                    return (
                                        <TodoItem
                                            key={index}
                                            text={item}
                                            completedTask={this.completedTask}
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
                {this.state.taskItems.length < 5 ? (
                    <KeyboardAvoidingView
                        behavior={Platform.os === 'ios' ? 'padding' : 'height'}
                        style={styles.addNewTask}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder={'New Task'}
                            value={this.state.task}
                            onChangeText={(text) =>
                                this.setState({ task: text })
                            }
                        />
                        <TouchableOpacity onPress={() => this.handleAddTask()}>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addText}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                ) : (
                    <Text> EXEEDED</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#48CFAF',
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
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: 250,
        fontFamily: 'monospace',
        backgroundColor: '#B5FBDD',
        borderColor: '#00848C',
        borderRadius: 60,
        borderWidth: 1,
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
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#00848C',

        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
});
export default App;
