import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import TextField from '../../components/molecules/text_field';
import CustomText from '../../components/atoms/text';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import SendVerificationCode from '../../components/molecules/send_verification_code';
import g_THEME from '../../theme/theme';
import apis from '../../api/api_service';
import { RootProps } from '../../navigation/stack_navigation';

const ForgetPasswordScreen: React.FC<RootProps<'ForgetPassword'>> = (props) => {

    const [seconds, setSeconds] = useState(0);
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    useEffect(() => {
        if (seconds > 0) {
          const timerId = setTimeout(() => {
            setSeconds(seconds - 1);
          }, 1000);
    
          // Cleanup timer on unmount or when seconds change
          return () => clearTimeout(timerId);
        }
      }, [seconds]);

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        setUsernameError('');
    }

    const handleCodeChange = (value: string) => {
        setCode(value);
        setCodeError('');
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordError('');
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');
    }

    const handleForgetPassword = async () => {
        if (seconds > 0) {
            return;
        }
        if (username == '') {
            setUsernameError('Username cannot be empty');
            return;
        }

        await apis.user.forgetPassword(username)
            .then((response) => {
                setSeconds(20);
                console.log('success to send code');
            })
            .catch((error) => {
                console.log('failed to send code');
                setCodeError(error);
            });
    };

    const handleResetPassword = async () => {
        if (code == '') {
            setCodeError('Verification code cannot be empty');
            return;
        }
        await apis.user.resetPassword(username, password)
            .then((response) => {
                console.log('success to reset password');
                props.navigation.navigate('Login');
            })
            .catch((error) => {
                console.log('failed to reset password');
                setCodeError(error);
            });
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
                <CustomText size={22}>Reset Password</CustomText>
                <View style={styles.text}>
                    <View style={styles.space} />
                    <TextField hint={'username'} text={username} error={usernameError} onChange={handleUsernameChange} />
                    <View style={styles.space} />
                    <SendVerificationCode hint={'verification code'} text={code} color={seconds > 0 ? g_THEME.colors.grey : undefined} error={codeError} onChange={handleCodeChange} onPress={handleForgetPassword} />
                    <View style={styles.longSpace} />
                    <CustomText size={12} color={g_THEME.colors.grey} textAlign={'center'}>Can be re-sent in {seconds} seconds</CustomText>
                    <View style={styles.longSpace} />
                </View>
                <GradientButton
                    title="Confirm"
                    onPress={handleForgetPassword}
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
        padding: screenHeight * 0.02,
    },
    text: {
        paddingHorizontal: screenWidth * 0.05,
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

export default ForgetPasswordScreen;
