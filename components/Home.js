import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Button from './Button';

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
    const [stats, setStats] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise((resolve) => {
            props.fetchUser();
            setTimeout(resolve, timeout);
        });
    };

    // =====calculations for stats bar

    let lifeTimeFocus = props.stats
        ? props.stats.map((stat) => stat.time).reduce((a, b) => a + b, 0)
        : 0;
    let lifeTimeHrs = lifeTimeFocus ? Math.floor(lifeTimeFocus / 60) : 0;
    let lifeTimeMins = lifeTimeFocus ? lifeTimeFocus - lifeTimeHrs * 60 : 0;

    let statsAverage = props.stats ? lifeTimeFocus / props.stats.length : 0;
    let percentageOfAverage = props.focusTime
        ? Math.floor((props.focusTime.time / statsAverage) * 100)
        : 0;
    let comparedToYesterday =
        props.focusTime && props.stats.length > 2
            ? props.focusTime.time - props.stats[props.stats.length - 2].time
            : 0;
    let moreOrLess = comparedToYesterday > 0 ? 'more' : 'less';
    const { name } = props.route.params;
    const [loading, setLoading] = useState(false);
    let hrs = props.focusTime ? Math.floor(props.focusTime.time / 60) : 0;
    let mins = props.focusTime ? props.focusTime.time - hrs * 60 : 0;

    // ===================

    useEffect(() => {
        props.fetchUser();
        if (allData) {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        setLoading(true);
        setAllData(props.currentUser);
        if (allData) {
            setUncompletedTasks(props.uncompletedTasks);
            setLoading(false);
        }
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
    const commitsData = [
        { date: '2017-01-02', count: 1 },
        { date: '2017-01-03', count: 2 },
        { date: '2017-01-04', count: 3 },
        { date: '2017-01-05', count: 14 },
        { date: '2017-01-06', count: 5 },
        { date: '2017-01-30', count: 2 },
        { date: '2017-01-31', count: 3 },
        { date: '2017-03-01', count: 2 },
        { date: '2017-04-02', count: 4 },
        { date: '2017-03-05', count: 2 },
        { date: '2017-02-30', count: 4 },
    ];

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
                <ScrollView
                    pagingEnabled
                    horizontal={true}
                    snapToInterval={Dimensions.get('window').width - 20}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.dailyStatsItem}>
                        <Text style={styles.dailyStats}>Daily Stats:</Text>
                        <Text
                            style={styles.dailyStatsText}
                        >{` ${hrs}h ${mins}m`}</Text>
                        <Text style={styles.dailyStatsPercentage}>
                            {`${percentageOfAverage}% Greater Than Average`}
                        </Text>
                        <Text style={styles.dailyStatsPercentage}>
                            {`${Math.abs(
                                comparedToYesterday
                            )} mins ${moreOrLess} than yesterday.`}
                        </Text>
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
                                        data: props.weeksStats
                                            ? props.weeksStats
                                            : [0],
                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width - 10}
                            height={200}
                            yAxisSuffix=" min"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: '#278EA5',
                                backgroundGradientFrom: '#071E3D',
                                backgroundGradientTo: '#278EA5',
                                opacity: 1,
                                decimalPlaces: 0, // optional, defaults to 2dp
                                // yAxisLabel: 'Hours of fsdfsdfsdfsocus',
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
                    <View style={styles.dailyStatsItem}>
                        <Text style={styles.dailyStats}>LIfe Time Stats:</Text>
                        <Text
                            style={styles.dailyStatsText}
                        >{` ${lifeTimeHrs}h ${lifeTimeMins}m`}</Text>
                        <Text style={styles.dailyStatsPercentage}>
                            Well done but keep going!
                        </Text>
                    </View>
                    <ContributionGraph
                        values={commitsData}
                        endDate={new Date('2017-04-01')}
                        numDays={105}
                        width={Dimensions.get('window').width - 10}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#278EA5',
                            backgroundGradientFrom: '#071E3D',
                            backgroundGradientTo: '#278EA5',
                            opacity: 1,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            // yAxisLabel: 'Hours of fsdfsdfsdfsocus',
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
                    />
                </ScrollView>
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
                        {!loading ? (
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
                    <Button
                        text="Focus Mode"
                        onPress={() => props.navigation.push('Focus')}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: '#278EA5',
                            opacity: 0.4,
                            // marginVertical: hp(2,
                        }}
                    />
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
    dailyStatsText: {
        fontSize: 60,
        color: '#fff',
        // opacity: 0.5,
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
    dailyStats: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        // textAlign: 'center',
    },
    dailyStatsItem: {
        width: Dimensions.get('window').width - 20,
        height: 200,
        backgroundColor: '#39A6A3',
        opacity: 0.4,
        marginTop: 40,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        // flexDirection: 'row',
    },
    dailyStatsPercentage: {
        fontSize: 20,
        color: '#fff',
        opacity: 0.5,
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
        backgroundColor: '#278EA5',
        opacity: 0.2,
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
    focusTime: store.userState.focusTime,
    weeksStats: store.userState.weeksStats,
    stats: store.userState.stats,
});
const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
