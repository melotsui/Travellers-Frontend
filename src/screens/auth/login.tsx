import { StyleSheet, Text, TouchableOpacity, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
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


const Login: React.FC<Props<'Login'>> = (props) => {
    const handleButtonPress = () => {
        console.log('Login');
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
                <View style={styles.space} />
                <TextField hint={'username'}></TextField>
                <View style={styles.space} />
                <TextField hint={'password'}></TextField>
                <View style={styles.longSpace} />
                <GradientButton
                    title="Login"
                    onPress={handleButtonPress}
                />
                <View style={styles.longSpace} />
                <SeparateLine isTextInclude={true} ></SeparateLine>
                <View style={styles.space} />
                <ThirdPartyLogin />
                <View style={styles.space} />
                <TextButton text={"Register"} onPress={() => props.navigation.navigate('Register')}></TextButton>
                <View style={styles.space} />
                <View style={g_STYLE.row}>
                    <CustomText data={'forget password?'} />
                    <TextButton text={"click here"} onPress={function (): void {throw new Error('Function not implemented.');}} />
                </View>
            </View>
        </ScrollView>
    );


};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    space: {
        height: screenHeight * 0.02,
    },
    longSpace: {
        height: screenHeight * 0.04,
    },
    image: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
    },
});

export default Login;
