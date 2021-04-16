import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Vibration,
    Pressable,
} from 'react-native';

export default function Pomodoro() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [start, setStart] = useState(false);
    const [reset, setReset] = useState(false);
    if (start) {
        let interval = setInterval(() => {
            clearInterval(interval);

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else {
                    let minutes = displayMessage ? 24 : 4;
                    let seconds = 59;

                    setSeconds(seconds);
                    setMinutes(minutes);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);
    }
    const minTimer = minutes < 10 ? `0${minutes}` : minutes;
    const secTimer = seconds < 10 ? `0${seconds}` : seconds;
    return (
        <View>
            <View style={styles.timer}>
                <Text style={styles.numbers}>{`${minTimer}:${secTimer}`}</Text>
                <Pressable
                    onPress={() => {
                        setStart(!start);
                        Vibration.vibrate(10);
                    }}
                    style={styles.startStop}
                >
                    <View>
                        {start ? (
                            <Text style={styles.addText} style={styles.start}>
                                Stop
                            </Text>
                        ) : (
                            <Text style={styles.addText} style={styles.start}>
                                Start
                            </Text>
                        )}
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    startStop: {
        width: 100,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00848C',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    start: {
        fontFamily: 'monospace',
        fontSize: 30,
    },
    stop: {
        fontFamily: 'monospace',
        fontSize: 30,
    },
    timer: {
        alignItems: 'center',
    },
    numbers: {
        textDecorationLine: 'underline',
        fontFamily: 'monospace',
        fontSize: 60,
    },
});
