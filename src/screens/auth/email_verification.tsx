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
import { useSelector } from 'react-redux';
import { RootProps } from '../../navigation/screen_navigation_props';
import { RootState } from '../../slices/root_reducers';

const EmailVerificationScreen: React.FC<RootProps<'EmailVerification'>> = (props) => {
    const user = useSelector((state: RootState) => state.user);
    const [seconds, setSeconds] = useState(0);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [emailError, setEmailError] = useState('');
    const [codeError, setCodeError] = useState('');

    useEffect(() => {
        if (seconds > 0) {
          const timerId = setTimeout(() => {
            setSeconds(seconds - 1);
          }, 1000);
    
          // Cleanup timer on unmount or when seconds change
          return () => clearTimeout(timerId);
        }
      }, [seconds]);

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setEmailError('');
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
        setCodeError('');
    };

    const handleSendCode = async () => {
        if (seconds > 0) {
            return;
        }
        if (email == '') {
            setEmailError('Username cannot be empty');
            return;
        }
        await apis.user.sendVerifyEmail(email)
            .then((response) => {
                setSeconds(20);
                console.log('success to send code');
            })
            .catch((error) => {
                console.log('failed to send code');
                setCodeError(error);
            });
    };

    const handleEmailVerification = async () => {
        console.log(user);
        if (email == '') {
            setEmailError('Username cannot be empty');
            return;
        }
        if (code == '') {
            setCodeError('Verification code cannot be empty');
            return;
        }

        await apis.user.verifyEmail(user!.users[0].user_id.toString(), code, email)
            .then((response) => {
                console.log('success to verify');
                props.navigation.navigate('HomeBottomBarNavigation');
            })
            .catch((error) => {
                console.log('failed to verify');
                setCodeError(error);
            });
    };

    const handleSkip = () => {
        props.navigation.navigate('HomeBottomBarNavigation');
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
                <View style={styles.text}>
                    <View style={styles.space} />
                    <TextField hint={'email'} text={email} error={emailError} onChange={handleEmailChange}></TextField>
                    <View style={styles.space} />
                    <SendVerificationCode hint={'verification code'} text={code} color={seconds > 0 ? g_THEME.colors.grey : undefined} error={codeError} onChange={handleCodeChange} onPress={handleSendCode} />
                    {seconds > 0 && <><View style={styles.longSpace} />
                    <CustomText size={12} color={g_THEME.colors.grey} textAlign={'center'}>Can be re-sent in {seconds} seconds</CustomText></>}
                    <View style={styles.longSpace} />
                    <View style={styles.longSpace} />
                </View>
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

export default EmailVerificationScreen;
