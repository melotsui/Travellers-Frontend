import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import TextField from '../../components/molecules/text_field';
import TextButton from '../../components/atoms/text_button';
import CustomText from '../../components/atoms/text';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import SendVerificationCode from '../../components/molecules/send_verification_code';
import g_THEME from '../../theme/theme';
import apis from '../../api/api_service';
import { RootProps } from '../../navigation/stack_navigation';

const EmailVerificationScreen: React.FC<RootProps<'EmailVerification'>> = (props) => {

    const [seconds, setSeconds] = useState(0);
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [codeError, setCodeError] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        setUsernameError('');
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
        setCodeError('');
    };

    const handleSendCode = async () => {
        if(username == '') {
            setUsernameError('Username cannot be empty');
            return;
        }
        await apis.user.sendVerifyEmail(username)
        .then((response) => {
            console.log('success to send code');
            props.navigation.navigate('Register');
        })
        .catch((error) => {
            console.log('failed to send code');
            setCodeError(error);
        });
    };

    const handleEmailVerification = async () => {
        if(username == '') {
            setUsernameError('Username cannot be empty');
            return;
        }
        if(code == '') {
            setCodeError('Verification code cannot be empty');
            return;
        }

        await apis.user.verifyEmail(username, code)
        .then((response) => {
            console.log('success to verify');
            props.navigation.navigate('Register');
        })
        .catch((error) => {
            console.log('failed to verify');
            setCodeError(error);
        });
    };

    const handleSkip = () => {
        props.navigation.navigate('Register');
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
                <CustomText size={22}>Bind your email to Travellers</CustomText>
                <View style={styles.space} />
                <TextField hint={'username'} text={username} error={usernameError} onChange={handleUsernameChange}></TextField>
                <View style={styles.space} />
                <SendVerificationCode hint={'verification code'} text={code} error={codeError} onChange={handleCodeChange} onPress={handleSendCode} />
                <View style={styles.longSpace} />
                <CustomText size={12} color={g_THEME.colors.grey}>Can be re-sent in 20 seconds</CustomText>
                <View style={styles.longSpace} />
                <View style={styles.longSpace} />
                <GradientButton
                    title="Confirm"
                    onPress={handleEmailVerification}
                />
                <TextButton onPress={handleSkip} color={g_THEME.colors.grey} size={22}>Skip</TextButton>
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
        height: screenHeight * 0.04,
    },
    image: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
    },
});

export default EmailVerificationScreen;
