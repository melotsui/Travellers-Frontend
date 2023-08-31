import React from 'react';
import {  StyleSheet, Text } from 'react-native';
import g_THEME from '../../theme/theme';

interface TextFieldProps {
    children: React.ReactNode;
    size?: number;
    color?: string,
    textAlign?: 'center' | 'left' | 'right' | 'auto' | 'justify' | undefined;
  }
  
const CustomText: React.FC<TextFieldProps> = ({children, size, color, textAlign}) => {

    const styles =  StyleSheet.create({
        text: {
            fontFamily: g_THEME.fonts.regular,
            fontSize: size,
            color: color || 'black',
            textAlign: textAlign,
        },
    });

    return (
    <Text style={styles.text}>
        {children}
    </Text>
    );
};


export default CustomText;