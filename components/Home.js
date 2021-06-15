import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({ navigation }) {
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

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
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
                            backgroundGradientFrom: '#21E6C1',
                            backgroundGradientTo: '#071E3D',
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
                <Button
                    onPress={() => navigation.push('Focus')}
                    title="FOCUS MODE"
                    color="#21E6C1"
                />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#071e3d',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 3000,
    },
    chart: {
        paddingTop: 30,
    },
    greeting: {
        paddingTop: 30,
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#21E6C1',
    },
});
