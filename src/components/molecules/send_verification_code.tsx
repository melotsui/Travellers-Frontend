import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import g_STYLE from '../../styles/styles';
import { screenWidth, screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import GradientButton from './gradient_button';

interface SendVerificationCodeProps {
    hint: string;
    id: string;
  }
  
const SendVerificationCode: React.FC<SendVerificationCodeProps> = ({hint, id}) => {
    const [text, setText] = useState('');

    const handleTextChange = (text: string) => {
        setText(text);
    };
    const sendCode = () => {
        console.log('send verification code');
    }
    return (
        <View style={{ overflow: 'hidden', borderRadius: 25}}>
            <View style={[g_STYLE.textFieldContainer, g_STYLE.textFieldShadowProp]}>
                <View style={[styles.container, g_STYLE.row]}>
                <GradientButton title={'Send'} onPress={() => sendCode} radius={20} width={0.25}/>
                <TextInput
                    style={[styles.input]}
                    value={text}
                    onChangeText={handleTextChange}
                    placeholder={hint}
                    placeholderTextColor={'rgba(0, 0, 0, 0.21)'}
                />
                </View>
            </View>
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