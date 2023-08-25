import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import TextField from '../../components/atoms/text_field';
import Props from '../../constants/types';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import apis from '../../api/api_service';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/profile_actions';

const Register: React.FC<Props<'Register'>> = (props) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmpasswordError, setConfirmPasswordError] = useState('');

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
        if (username == '') {
            setUsernameError('Username cannot be empty');
            return;
        }
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
        await apis.auth.register(username, password)
            .then((response) => {
                console.log('success to register');
                props.navigation.navigate('EmailVerification');
            })
            .catch((error) => {
                setUsernameError(error.message);
            });
        await apis.auth.getMyProfile().then((response) => {
            console.log('success to get profile');
            dispatch(updateProfile(response));
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
                <TextField hint={'username'} text={username} error={usernameError} onChange={handleUsernameChange} />
                <View style={styles.space} />
                <TextField hint={'password'} text={password} error={passwordError} onChange={handlePasswordChange} secure={true}/>
                <View style={styles.space} />
                <TextField hint={'confirm password'} text={confirmPassword} error={confirmpasswordError} onChange={handleConfirmPasswordChange} secure={true}/>
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
