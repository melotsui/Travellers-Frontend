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
import SendVerificationCode from '../../components/molecules/send_verification_code';
import g_THEME from '../../theme/theme';

const EmailVerification: React.FC<Props<'EmailVerification'>> = (props) => {
    const handleButtonPress = () => {
        console.log('Register');
        props.navigation.navigate('Register');
    };

    const [error, setError] = useState('');

    const handleError = (error: string) => {
        setError(error);
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
                <CustomText data='Bind your email to Travellers' size={22}></CustomText>
                <View style={styles.space} />
                <TextField hint={'email'}></TextField>
                <View style={styles.space} />
                <SendVerificationCode hint={'verification code'} id={''} />
                <View style={styles.longSpace} />
                <CustomText data='Can be re-sent in 20 seconds' size={12} color={g_THEME.colors.grey}></CustomText>
                <View style={styles.longSpace} />
                <View style={styles.longSpace} />
                <GradientButton
                    title="Confirm"
                    onPress={handleButtonPress}
                />
                <TextButton text={'Skip'} onPress={function (): void {
                    throw new Error('Function not implemented.');
                } } color={g_THEME.colors.grey} size={22}/>
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
        height: screenHeight * 0.04,
    },
    image: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
    },
});

export default EmailVerification;
