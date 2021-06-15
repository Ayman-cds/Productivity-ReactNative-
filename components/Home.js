import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
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

export default function Home({ navigation }) {
    const [taskItems, setTaskItems] = useState([]);
    const chartConfig = {
        backgroundGradientFrom: '#21E6C1',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#071E3D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };
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
    useEffect(() => {
        getTasks();
    }, []);
    return (
        <View style={styles.container}>
            <LinearGradient
                Background
                Linear
                Gradient
                colors={['#071E3D', '#278EA5', '#21E6C1']}
                style={styles.background}
            >
                <Text style={styles.greeting}> Hi Ayman,</Text>
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
                <View style={styles.uncompletedTasks}>
                    <Text style={styles.uncompletedTasksText}>
                        Uncompleted Tasks
                    </Text>
                    <LinearGradient
                        Background
                        Linear
                        Gradient
                        colors={['#278EA5', '#21E6C1']}
                        // style={styles.background}
                    >
                        <ScrollView style={styles.uncompletedTasksScroll}>
                            {taskItems.map((task) => {
                                return (
                                    <View style={styles.item}>
                                        <Text>{task.label}</Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <Button
                            onPress={() => navigation.push('Focus')}
                            style={styles.button}
                            title="FOCUS MODE"
                            color="#21E6C1"
                        />
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
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
    background: {
        // position: 'absolute',
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
    },
    uncompletedTasksText: {
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#21E6C1',
    },
    greeting: {
        paddingTop: 30,
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#21E6C1',
    },
    button: {
        borderRadius: 30,
        width: 30,
    },
});
