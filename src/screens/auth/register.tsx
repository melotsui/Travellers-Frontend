import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import SeparateLine from '../../components/atoms/separate_line';
import TextField from '../../components/atoms/text_field';
import ThirdPartyLogin from './third_party_login';
import TextButton from '../../components/atoms/text_button';
import g_STYLE from '../../styles/styles';
import CustomText from '../../components/atoms/text';
import Props from '../../constants/types';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import apis from '../../api/api_service';

const Register: React.FC<Props<'Register'>> = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
    }

    const handleRegister = async () => {
        if (password == confirmPassword) {
            apis.auth.register(username, password)
                .then((response) => {
                    console.log('EmailVerification');
                    console.log(response);
                    props.navigation.navigate('EmailVerification');
                })
                .catch((error) => {
                    setUsernameError(error);
                });
        } else {
            setPasswordError('Password not match');
        }
    };

    return (
        <ScrollView style={{ height: '100%' }}>
            <View style={[styles.container, { flex: 1, }]}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={[styles.container, { flex: 2, }]}>
                <TextField hint={'username'} text={username} error={usernameError} onChange={handleUsernameChange} />
                <View style={styles.space} />
                <TextField hint={'password'} text={password} onChange={handlePasswordChange} />
                <View style={styles.space} />
                <TextField hint={'confirm password'} text={confirmPassword} error={passwordError} onChange={handleConfirmPasswordChange} />
                <View style={styles.longSpace} />
                <GradientButton
                    title="Sign-up"
                    onPress={handleRegister}
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
        paddingTop: screenHeight * 0.02,
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
