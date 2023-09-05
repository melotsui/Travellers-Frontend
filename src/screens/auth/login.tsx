import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import SeparateLine from '../../components/atoms/separate_line';
import TextField from '../../components/molecules/text_field';
import ThirdPartyLogin from './third_party_login';
import TextButton from '../../components/atoms/text_button';
import g_STYLE from '../../styles/styles';
import CustomText from '../../components/atoms/text';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import apis from '../../api/api_service';
import { updateUser } from '../../actions/user_actions';
import { useDispatch } from 'react-redux';
import { RootProps } from '../../navigation/screen_navigation_props';
import { useRoute } from '@react-navigation/native';


const LoginScreen: React.FC<RootProps<'Login'>> = (props) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (value: string) => {
        setUsernameError('');
        setUsername(value);
    };

    const handlePasswordChange = (value: string) => {
        setPasswordError('');
        setPassword(value);
    };

    const handleLogin = async () => {
        // if (username == '') {
        //     setUsernameError('Username cannot be empty');
        //     return;
        // }
        // if (password == '') {
        //     setPasswordError('Password cannot be empty');
        //     return;
        // }
        await apis.auth.login('melo' , 'Abc123456')//username, password)
            .then((response) => {
                console.log('success to login');
            })
            .catch((error) => {
                console.log('failed to login');
                setPasswordError(error);
            });
        await apis.auth.getMyProfile().then((response) => {
            console.log('success to get profile');
            dispatch(updateUser(response));
            props.navigation.navigate('HomeBottomBarNavigation');
            
        }).catch((error) => {
            console.log('failed to get profile');
        }
        );
    }
    
    const handleForgetPassword = () => {
        props.navigation.navigate('ForgetPassword');
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
                <View style={styles.space} />
                <TextField hint={'username'} text={username} error={usernameError} onChange={handleUsernameChange}></TextField>
                <View style={styles.space} />
                <TextField hint={'password'} text={password} error={passwordError} onChange={handlePasswordChange} secure={true}></TextField>
                <View style={styles.longSpace} />
                </View>
                <GradientButton
                    title="Login"
                    onPress={handleLogin}
                />
                <View style={styles.longSpace} />
                <SeparateLine isTextInclude={true} ></SeparateLine>
                <View style={styles.space} />
                <ThirdPartyLogin />
                <View style={styles.space} />
                <TextButton onPress={() => props.navigation.navigate('Register')}>Register</TextButton>
                <View style={styles.space} />
                <View style={g_STYLE.row}>
                    <CustomText>forget password?</CustomText>
                    <TextButton onPress={handleForgetPassword}>click here</TextButton>
                </View>
            </View>
        </ScrollView>
    );


};

const styles = StyleSheet.create({
    container: {
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

export default LoginScreen;
