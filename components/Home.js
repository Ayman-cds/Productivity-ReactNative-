import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/actions';
import 'firebase/firestore';

function Home(props) {
    const [taskItems, setTaskItems] = useState([]);
    const [allData, setAllData] = useState([]);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const { name } = props.route.params;
    useEffect(() => {
        props.fetchUser();
        console.log('nameee ====>>', name);
        console.log('props =======>', props);
    }, []);
    useEffect(() => {
        setAllData(props.currentUser);
        if (allData) {
            setUncompletedTasks(props.uncompletedTasks);
        }
        console.log('All Data ---->>>', allData);
    }, [fetchUser()]);
    const getTasks = async () => {
        try {
            const jsonTasks = await AsyncStorage.getItem('tasks');
            const tasks = jsonTasks != null ? JSON.parse(jsonTasks) : [];
            setTaskItems(tasks);
        } catch (error) {
            console.error(error);
        }
    };
    const signOut = () => {
        firebase.auth().signOut();
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                Background
                Linear
                Gradient
                colors={['#071E3D', '#278EA5', '#21E6C1']}
                style={styles.background}
            >
                <View style={styles.greetingAndSignout}>
                    <Text style={styles.greeting}> Hi {name},</Text>
                    <Entypo
                        onPress={signOut}
                        name="log-out"
                        style={styles.logout}
                        size={34}
                        color="white"
                    />
                </View>
                <View style={styles.chart}>
                    <LineChart
                        data={{
                            labels: [
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thur',
                                'Fri',
                                'Sat',
                                'Sun',
                            ],
                            datasets: [
                                {
                                    data: [
                                        Math.round(Math.random() * 10),
                                        Math.round(Math.random() * 10),
                                        Math.round(Math.random() * 10),
                                        Math.round(Math.random() * 10),
                                        Math.round(Math.random() * 10),
                                    ],
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="h"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: '#278EA5',
                            backgroundGradientFrom: '#071E3D',
                            backgroundGradientTo: '#278EA5',
                            opacity: 1,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#071E3D',
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <LinearGradient
                    Background
                    Linear
                    Gradient
                    colors={['#278EA5', '#21E6C1']}
                    style={styles.uncompletedTasks}
                >
                    <Text style={styles.uncompletedTasksText}>
                        Uncompleted Tasks
                    </Text>
                    <ScrollView style={styles.uncompletedTasksScroll}>
                        {allData ? (
                            uncompletedTasks.map((task) => {
                                return (
                                    <View style={styles.item}>
                                        <Text style={styles.taskLabel}>
                                            {task.label}
                                        </Text>
                                    </View>
                                );
                            })
                        ) : (
                            <ActivityIndicator size="large" color="#071E3D" />
                        )}
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => props.navigation.push('Focus')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>FOCUS MODE</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    greetingAndSignout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logout: {
        paddingTop: 25,
        paddingRight: 10,
        opacity: 0.7,
    },
    item: {
        backgroundColor: '#39A6A3',
        marginTop: 10,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    uncompletedTasksScroll: {
        height: 300,
    },
    taskLabel: {
        color: '#fff',
        opacity: 0.5,
        fontWeight: 'bold',
    },
    background: {
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
    },
    chart: {
        paddingTop: 30,
    },
    uncompletedTasks: {
        borderRadius: 30,
        backgroundColor: '#278EA5',
        paddingBottom: 40,
        paddingTop: 10,
    },
    uncompletedTasksText: {
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        opacity: 0.7,
    },
    greeting: {
        paddingTop: 30,
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        opacity: 0.75,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#21E6C1',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        opacity: 0.7,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    uncompletedTasks: store.userState.uncompletedTasks,
});
const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
