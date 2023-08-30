import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import g_STYLE from '../../styles/styles';
import { screenWidth } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import GradientButton from './gradient_button';
import Container from '../atoms/container';
import CustomText from '../atoms/text';

interface SendVerificationCodeProps {
    text: string;
    hint: string;
    onChange: (value: string) => void;
    onPress: () => void;
    error?: string;
}

const SendVerificationCode: React.FC<SendVerificationCodeProps> = ({ text, hint, onChange, onPress, error }) => {
    const handleTextChange = (text: string) => {
        onChange(text);
    };
    const sendCode = () => {
        onPress();
        console.log('send verification code');
    }
    return (
        <View>
            <Container>
                <View style={[styles.container, g_STYLE.row]}>
                    <GradientButton title={'Send'} onPress={sendCode} radius={20} width={0.25} />
                    <TextInput
                        style={[styles.input]}
                        value={text}
                        onChangeText={handleTextChange}
                        placeholder={hint}
                        placeholderTextColor={'rgba(0, 0, 0, 0.21)'}
                    />
                </View>
            </Container>
            {error != null && error.length != 0 &&
                <View style={{ paddingLeft: 15 }}>
                    <CustomText color='red' size={12}>{error}</CustomText>
                </View>}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.8,
        borderRadius: 25,
        backgroundColor: 'rgba(172, 224, 246, 0.17)',
        borderColor: 'rgba(172, 224, 246, 0.17)',
        borderWidth: 1,
    },
    input: {
        fontSize: 18,
        fontFamily: g_THEME.fonts.regular,
        width: '100%',
    }
});


export default SendVerificationCode;