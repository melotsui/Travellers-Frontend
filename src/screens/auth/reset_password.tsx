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

const ResetPasswordScreen: React.FC<RootProps<'ResetPassword'>> = (props) => {
    const {user_id, passcode} = props.route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordError('');
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');
    }

    const handleResetPassword = async () => {
        console.log(user_id);
        console.log(passcode);
        if (password == '') {
            setPasswordError('Password cannot be empty');
            return;
        }
        if (confirmPassword == '') {
            setConfirmPasswordError('Confirm password cannot be empty');
            return;
        }
        if (password != confirmPassword) {
            setConfirmPasswordError('Password not match');
            return;
        }

        await apis.user.resetPassword('', '', password)
            .then((response) => {
                console.log('success to reset password');
                props.navigation.navigate('Login');
            })
            .catch((error) => {
                console.log('failed to reset password');
                setConfirmPasswordError(error);
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
                    <TextField hint={'new password'} text={password} error={passwordError} onChange={handlePasswordChange} />
                    <View style={styles.space} />
                    <TextField hint={'confirm new password'} text={confirmPassword} error={confirmPasswordError} onChange={handleConfirmPasswordChange} />
                    <View style={styles.longSpace} />
                </View>
                <GradientButton
                    title="Confirm"
                    onPress={handleResetPassword}
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

export default ResetPasswordScreen;
