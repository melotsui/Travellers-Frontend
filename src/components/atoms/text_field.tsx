import React, { ChangeEvent, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import g_STYLE from '../../styles/styles';
import CustomText from './text';

interface TextFieldProps {
    hint: string;
    text: string;
    onChange: (value: string) => void;
    error?: string;
    secure?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ hint, text, onChange, error, secure }) => {

    const handleInputChange = (text: string) => {
        onChange(text);
    };

    return (
        <View style={{ overflow: 'hidden', paddingBottom: 5, borderRadius: 25 }}>
            <View style={[g_STYLE.textFieldContainer, g_STYLE.textFieldShadowProp]}>
                <TextInput
                    style={[styles.input]}
                    value={text}
                    onChangeText={handleInputChange}
                    placeholder={hint}
                    placeholderTextColor={'rgba(0, 0, 0, 0.21)'}
                    secureTextEntry={secure}
                />
            </View>
            <View style={{ paddingLeft: 15 }}>
                {error != null && <CustomText color='red' size={12}>{error}</CustomText>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.08,
        fontSize: 18,
        fontFamily: g_THEME.fonts.regular,
        borderRadius: 25,
        paddingHorizontal: screenWidth * 0.05,
        backgroundColor: 'rgba(172, 224, 246, 0.17)',
        borderColor: 'rgba(172, 224, 246, 0.17)',
        borderWidth: 1,
    }
});

export default TextField;