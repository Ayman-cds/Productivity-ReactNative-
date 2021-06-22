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
    Dimensions,
    PixelRatio,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Pomodoro } from '../Pomodoro';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateUserTasks } from '../redux/actions';
console.disableYellowBox = true;
const COLORS = {
    WHITE: '#fff',
    TEAL: '#278EA5',
    BLACK: '#000',
    WHITE_OPACITY: '#ffffff80',
    GRADIENT_1: '#071E3D',
    GRADIENT_2: '#1F4287',
    GRADIENT_3: '#21E6C1',
    ORANGE: '#f48d3c',
    GREY: '#0f0f0f',
    GREY_OPACITY: '#0f0f0f80',
    GRADIENT_OPACITY: '#72c2d980',
};
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const wp = (widthPercent) => {
    return PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);
};

const hp = (heightPercent) => {
    return PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);
};
function Focus(props) {
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [timing, setTiming] = useState(false);
    // const { name, uid } = props.route.params;
    const getTasks = async () => {
        try {
            const jsonTasks = await AsyncStorage.getItem('tasks');
            const tasks = jsonTasks != null ? JSON.parse(jsonTasks) : [];
            setTaskItems(tasks);
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

    const handleAddTask = () => {
        Vibration.vibrate(50);
        Keyboard.dismiss();

        setTask('');
        if (task !== '') {
            let newTaskObj = {
                id: uuid.v4(),
                label: task,
            };
            let newTasks = [...taskItems, newTaskObj];
            setTaskItems(newTasks);
            storeTasks(newTasks);
            props.updateUserTasks(newTasks);
        }
    };

    const completedTask = async (index) => {
        Vibration.vibrate(40);
        Vibration.vibrate(40);

        let itemCopy = [...taskItems];
        itemCopy.splice(index, 1);
        setTaskItems(itemCopy);
        storeTasks(itemCopy);
        props.updateUserTasks(itemCopy);
    };

    const deleteAll = async () => {
        setTaskItems([]);
        storeTasks(taskItems);
        props.updateUserTasks(taskItems);
    };
    useEffect(() => {
        getTasks();
    }, []);
    const renderItem = ({ item, index, drag, isActive }) => (
        <TouchableOpacity onLongPress={() => completedTask(index)}>
            <View style={styles.item}>
                <TouchableOpacity onPressIn={drag}>
                    <FontAwesome name="bars" size={35} color="#071E3D" />
                </TouchableOpacity>
                <Text style={styles.text}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <LinearGradient
            Background
            Linear
            Gradient
            colors={['#071E3D', '#278EA5', '#21E6C1']}
            style={styles.background}
        >
            <TouchableOpacity
                onLongPress={() => props.navigation.navigate('Home')}
            >
                <Pomodoro />
            </TouchableOpacity>
            <DraggableFlatList
                style={styles.list}
                data={taskItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={({ data }) => setTaskItems(data)}
            />
            <View style={styles.textInput}>
                {/* <MaterialIcons
                    name="delete-sweep"
                    size={24}
                    color="black"
                    onPress={deleteAll}
                /> */}
                <KeyboardAvoidingView
                    behavior={Platform.os === 'ios' ? 'padding' : 'height'}
                    style={styles.addNewTask}
                >
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="New Task"
                        value={task}
                        placeholderTextColor="#fff"
                        onChangeText={(task) => setTask(task)}
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
        color: '#FFF',
        justifyContent: 'center',
        opacity: 0.7,
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
        borderRadius: 60,
        height: 50,
        opacity: 0.8,
    },
    addNewTask: {
        bottom: 30,
        width: '100%',
        height: '0.5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 20,
    },
    addWrapper: {
        width: wp(19),
        height: hp(7),
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        shadowOffset: { width: 1, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        opacity: 0.8,
        shadowColor: COLORS.GRADIENT_3,
    },
    addText: {
        paddingTop: 3,
        color: '#21e6c1',
        // fontFamily: 'Montserrat',
    },
    textInputStyle: {
        borderRadius: wp(5),
        width: wp(70),
        height: hp(7),
        opacity: 0.8,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: hp(2),
        color: COLORS.WHITE,
        fontSize: wp(4),
        letterSpacing: wp(0.1),
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: COLORS.GRADIENT_3,
    },
});

const mapStateToProps = (store) => ({
    uncompletedTasks: store.userState.uncompletedTasks,
    currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    updateUserTasks: (tasks) => dispatch(updateUserTasks(tasks)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Focus);
