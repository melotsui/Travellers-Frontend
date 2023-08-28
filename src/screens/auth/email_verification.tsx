import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import TextField from '../../components/atoms/text_field';
import TextButton from '../../components/atoms/text_button';
import CustomText from '../../components/atoms/text';
import Props from '../../constants/types';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import SendVerificationCode from '../../components/molecules/send_verification_code';
import g_THEME from '../../theme/theme';
import apis from '../../api/api_service';

const EmailVerification: React.FC<Props<'EmailVerification'>> = (props) => {

    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
    

    const handleError = (error: string) => {
        setError(error);
    };

    
    const handleEmailVerification = async () => {
        await apis.user.sendVerifyEmail(text);
        console.log('Register');
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
                <TextField hint={'email'} text={''} error={''} onChange={function (value: string): void {
                    throw new Error('Function not implemented.');
                } }></TextField>
                <View style={styles.space} />
                <SendVerificationCode hint={'verification code'} id={''} />
                <View style={styles.longSpace} />
                <CustomText size={12} color={g_THEME.colors.grey}>Can be re-sent in 20 seconds</CustomText>
                <View style={styles.longSpace} />
                <View style={styles.longSpace} />
                <GradientButton
                    title="Confirm"
                    onPress={handleEmailVerification}
                />
                <TextButton onPress={function (): void {
                    throw new Error('Function not implemented.');
                } } color={g_THEME.colors.grey} size={22}>Skip</TextButton>
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

export default EmailVerification;
