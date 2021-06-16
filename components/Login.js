import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Dimensions, PixelRatio } from 'react-native';
import Button from './Button';

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

const wp = (widthPercent: number) => {
    return PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);
};

const hp = (heightPercent: number) => {
    return PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);
};

const Login = ({ navigation }) => {
    const [startClicked, setStartClicked] = useState(false);
    useEffect(() => {
        if (startClicked) {
            Animated.timing(bottomFlex, {
                toValue: 8,
                duration: 250,
                useNativeDriver: false,
                easing: Easing.linear,
            }).start();
        } else {
            Animated.timing(bottomFlex, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false,
                easing: Easing.linear,
            }).start();
        }
    }, [startClicked]);
    const [bottomFlex, setbottomFlex] = useState(new Animated.Value(1));
    return (
        <LinearGradient
            colors={[COLORS.GRADIENT_1, COLORS.GRADIENT_2, COLORS.GRADIENT_3]}
            style={styles.container}
        >
            <View style={styles.topPart}>
                <Text style={styles.bookTextStyle}>FOCUS</Text>
                <Text style={styles.bookTextStyle}>TIMER</Text>
            </View>
            <Animated.View style={[styles.bottomPart, { flex: bottomFlex }]}>
                {startClicked ? (
                    <LinearGradient
                        colors={['#1F4287', '#278EA5', '#21E6C1']}
                        style={styles.loginContainer}
                    >
                        <Text style={styles.loginTextStyle}>LOGIN</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="EMAIL"
                            placeholderTextColor={COLORS.WHITE}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="PASSWORD"
                            placeholderTextColor={COLORS.WHITE}
                            secureTextEntry
                        />
                        <Button
                            text="Login"
                            onPress={() => navigation.navigate('Home')}
                            style={{
                                alignSelf: 'center',
                                marginVertical: hp(2),
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={{
                                alignSelf: 'center',
                                marginVertical: hp(2),
                            }}
                        >
                            <Text>Create New Account</Text>
                        </TouchableOpacity>
                        <View style={styles.loginInWith}>
                            <Entypo
                                name="facebook-with-circle"
                                size={34}
                                color="#071E3D"
                            />
                            <AntDesign
                                name="google"
                                size={34}
                                color="#071E3D"
                            />
                            <Entypo name="linkedin" size={34} color="#071E3D" />
                        </View>
                    </LinearGradient>
                ) : (
                    <Button
                        text="Get Started"
                        onPress={() => setStartClicked(true)}
                        style={{
                            alignSelf: 'center',
                        }}
                    />
                )}
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    loginInWith: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    topPart: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingVertical: hp(10),
        alignItems: 'center',
    },
    loginContainer: {
        borderTopLeftRadius: wp(20),
        borderBottomLeftRadius: wp(20),
        // flex: 1,
    },
    bottomPart: {},
    bookTextStyle: {
        color: COLORS.WHITE,
        fontSize: wp(14),
        letterSpacing: wp(4),
        fontFamily: 'Montserrat-Light',
    },
    loginTextStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: hp(1),
        color: COLORS.BLACK,
        fontSize: wp(8),
        letterSpacing: wp(0.1),
        fontFamily: 'Montserrat',
    },
    textInputStyle: {
        borderRadius: wp(5),
        width: wp(70),
        height: hp(6),
        opacity: 0.5,
        backgroundColor: COLORS.GRADIENT_OPACITY,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: hp(2),
        color: COLORS.WHITE,
        fontSize: wp(4),
        letterSpacing: wp(0.1),
        fontFamily: 'Montserrat',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: COLORS.GRADIENT_3,
    },
});

export default Login;
