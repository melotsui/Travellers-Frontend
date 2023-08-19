import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react'
import GradientButton from '../../components/atoms/gradient_button';
import SeparateLine from '../../components/atoms/separate_line';
import TextField from '../../components/atoms/text_field';
import ThirdPartyLogin from './third_party_login';
import TextButton from '../../components/atoms/text_button';
import g_STYLE from '../../styles/styles';
import CustomText from '../../components/atoms/text';
import Props from '../../constants/types';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';

const Register: React.FC<Props<'Register'>> = (props) => {
    const handleButtonPress = () => {
        console.log('EmailVerification');
        props.navigation.navigate('EmailVerification');
    };

    const [error, setError] = useState('');

    const handleError = (error: string) => {
        setError(error);
    };

    return (
        <ScrollView style={{height: '100%'}}>
            <View style={[styles.container, {flex: 1,}]}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.image}
                resizeMode="contain"
            />
            </View>
            <View style={[styles.container, {flex: 2,}]}>
            <TextField hint={'username'}></TextField>
            <View style={styles.space} />
            <TextField hint={'password'}></TextField>
            <View style={styles.space} />
            <TextField hint={'confirm password'}></TextField>
            <View style={styles.longSpace} />
            <GradientButton
                title="Sign-up"
                onPress={handleButtonPress}
            />
            </View>

        </ScrollView>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    space: {
        height: screenHeight * 0.02,
    },
    longSpace: {
        height: screenHeight * 0.08,
    },
    image: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
    },
});

export default Register;
