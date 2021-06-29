import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTasks = async (tasksArr) => {
    try {
        const jsonTasks = JSON.stringify(tasksArr);
        await AsyncStorage.setItem('tasks', jsonTasks);
        console.log('STORED');
    } catch (error) {
        console.log(error);
    }
};

export const getTasks = async () => {
    try {
        const jsonTasks = await AsyncStorage.getItem('tasks');
        return jsonTasks != null ? JSON.parse(jsonTasks) : ['nothing'];
    } catch (error) {
        console.log(error);
    }
};
