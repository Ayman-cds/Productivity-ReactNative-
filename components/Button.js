import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';

const COLORS = {
    WHITE: '#fff',
    BLACK: '#000',
    WHITE_OPACITY: '#ffffff80',
    GRADIENT_1: '#72c2d9',
    GRADIENT_2: '#35a9ad',
    GRADIENT_3: '#03958b',
    TEAL: '#94D0CC',
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

const Button = (props) => {
    const { text, onPress, style } = props;
    return (
        <TouchableOpacity
            style={[styles.orangeButtonStyle, style]}
            onPress={onPress}
        >
            <Text style={styles.startTextStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orangeButtonStyle: {
        backgroundColor: COLORS.TEAL,
        height: hp(5),
        width: wp(50),
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        borderRadius: wp(3),
        // shadowColor: COLORS.GREY,
        // shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    startTextStyle: {
        color: COLORS.WHITE,
        // fontFamily: 'Montserrat-Regular',
        letterSpacing: wp(0.5),
    },
});

export default Button;
