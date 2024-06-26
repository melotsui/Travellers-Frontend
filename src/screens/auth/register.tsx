import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import TextField from '../../components/molecules/text_field';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import apis from '../../api/api_service';
import { RootProps } from '../../navigation/screen_navigation_props';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { DispatchThunk } from '../../store/store';
import { fetchUser } from '../../actions/user_actions';
import { useSelector } from 'react-redux';
import { userSelector } from '../../slices/user_slice';
import CustomText from '../../components/atoms/text';

const RegisterScreen: React.FC<RootProps<'Register'>> = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmpasswordError, setConfirmPasswordError] = useState('');
    const { error } = useSelector(userSelector);

    const dispatch: DispatchThunk = useDispatch();

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
                apis.notification.addFCMToken();
                dispatch(fetchUser());
                console.log('success to register');
                props.navigation.navigate('EmailVerification', { isEdit: false });
            })
            .catch((error) => {
                console.log(error);
                setUsernameError(error);
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
                <View style={styles.text}>
                    <TextField hint={'username'} text={username} error={usernameError} onChange={handleUsernameChange} />
                    <View style={styles.space} />
                    <TextField hint={'password'} text={password} error={passwordError} onChange={handlePasswordChange} secure={true} />
                    <View style={styles.space} />
                    <TextField hint={'confirm password'} text={confirmPassword} error={confirmpasswordError} onChange={handleConfirmPasswordChange} secure={true} />
                    <View style={styles.longSpace} />
                </View>
                <CustomText color='red' size={12} textAlign="center">{error}</CustomText>
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
        padding: screenHeight * 0.02,
    },
    text: {
        paddingHorizontal: screenWidth * 0.05,
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

export default RegisterScreen;
