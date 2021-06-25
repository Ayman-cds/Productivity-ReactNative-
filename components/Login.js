import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';
import Expo from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Dimensions, PixelRatio, ActivityIndicator } from 'react-native';
import Button from './Button';
import * as Google from 'expo-google-app-auth';
import firebaseConfig from './FirebaseConfig';
import * as firebase from 'firebase';
import 'firebase/firestore';
const getCurrentDate = () => {
    var date = new Date();
    return date;
};
require('firebase/auth');
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
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const ref = firebase.firestore().collection('users');

const Login = ({ navigation }) => {
    const [startClicked, setStartClicked] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
    function newUser(result) {
        const user = firebase.auth().currentUser;

        // console.log('result===>>', user);
        ref.doc(user.uid).set({
            email: result.user.email,
            fName: result.user.givenName,
            uncompletedTasks: [],
            stats: [],
            lastFocusTime: { time: 0, date: getCurrentDate() },
        });
    }
    function checkIfLoggedIn() {
        firebase.auth().onAuthStateChanged(function (user) {
            console.log('Auth state changed ');
            if (user) {
                navigation.navigate('Home', {
                    name: user.displayName,
                    uid: user.uid,
                });
            }
        });
    }
    function onPressGetStarted() {
        checkIfLoggedIn();
        setStartClicked(true);
    }
    function onSignIn(googleUser) {
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(async (firebaseUser) => {
                unsubscribe();
                if (!isUserEqual(googleUser, firebaseUser)) {
                    const credential =
                        firebase.auth.GoogleAuthProvider.credential(
                            googleUser.idToken,
                            googleUser.accessToken
                        );
                    try {
                        await firebase.auth().signInWithCredential(credential);
                        newUser(googleUser);

                        console.log('user is signed in ');
                    } catch (error) {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        const email = error.email;
                        const credential = error.credential;
                    }
                } else {
                    console.log('User already signed-in Firebase.');
                }
            });
    }
    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerId ===
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    async function onGoogleLogin() {
        try {
            setLoading(true);
            const result = await Google.logInAsync({
                androidClientId:
                    '290407391510-6jal6o3b9rbi73nk9qh0nsu4dpbl7mao.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            const { type, accessToken, user } = result;
            if (type === 'success') {
                // Then you can use the Google REST API
                let userInfoResponse = await fetch(
                    'https://www.googleapis.com/userinfo/v2/me',
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );
                onSignIn(result);
                const name = user.givenName;
                navigation.navigate('Home', { name, uid: user.uid });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);

            console.log('SOMETHING WENT WRONG', error);
            Alert.alert('Google Authentication Error', `${error}`.slice(7));
        }
    }

    async function onEmailLogin() {
        try {
            setLoading(true);
            const result = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            setName(result.user.displayName);
            setLoading(false);
            navigation.navigate('Home', {
                name: result.user.displayName,
                email,
                uid: result.user.uid,
            });
        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert('Incorrect Email/Password', `${error}`.slice(7));
        }
    }

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
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            style={styles.textInputStyle}
                            placeholder="EMAIL"
                            placeholderTextColor={COLORS.WHITE}
                            keyboardType="email-address"
                        />
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            style={styles.textInputStyle}
                            placeholder="PASSWORD"
                            placeholderTextColor={COLORS.WHITE}
                            secureTextEntry
                        />
                        {loading ? (
                            <ActivityIndicator size="large" color="#071E3D" />
                        ) : (
                            <Button
                                text="Login"
                                onPress={onEmailLogin}
                                style={{
                                    alignSelf: 'center',
                                    marginVertical: hp(2),
                                }}
                            />
                        )}

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}
                            style={{
                                alignSelf: 'center',
                                marginVertical: hp(2),
                            }}
                        >
                            <Text style={styles.createNewAccount}>
                                Create a new account
                            </Text>
                        </TouchableOpacity>
                        {Platform.OS === 'android' ? (
                            <View style={styles.loginInWith}>
                                <Text>Sign in with Google</Text>
                                <AntDesign
                                    name="google"
                                    size={34}
                                    color="#071E3D"
                                    onPress={onGoogleLogin}
                                />
                            </View>
                        ) : null}
                    </LinearGradient>
                ) : (
                    <Button
                        text="Get Started"
                        onPress={onPressGetStarted}
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
        borderBottomRightRadius: wp(20),
        // flex: 1,
    },
    bottomPart: {},
    bookTextStyle: {
        color: COLORS.WHITE,
        fontSize: wp(14),
        letterSpacing: wp(4),
        // fontFamily: 'Montserrat-Light',
    },
    loginTextStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: hp(1),
        color: COLORS.WHITE,
        opacity: 0.7,
        fontSize: wp(8),
        letterSpacing: wp(0.1),
        // fontFamily: 'Montserrat',
    },
    textInputStyle: {
        borderRadius: wp(5),
        width: wp(70),
        height: hp(6),
        opacity: 0.5,
        // backgroundColor: COLORS.GRADIENT_OPACITY,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: hp(2),
        color: COLORS.WHITE,
        fontSize: wp(4),
        letterSpacing: wp(0.1),
        // fontFamily: 'Montserrat',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: COLORS.GRADIENT_3,
    },
    createNewAccount: {
        color: 'white',
        opacity: 0.6,
    },
});

export default Login;
