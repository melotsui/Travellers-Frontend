import React from 'react';
import {  StyleSheet, Text } from 'react-native';
import g_THEME from '../../theme/theme';

interface TextProps {
    children: React.ReactNode;
    size?: number;
    color?: string,
    textAlign?: 'center' | 'left' | 'right' | 'auto' | 'justify' | undefined;
    numberOfLines?: number;
  }
  
const CustomText: React.FC<TextProps> = ({children, size, color, textAlign, numberOfLines}) => {

    const styles =  StyleSheet.create({
        text: {
            fontFamily: g_THEME.fonts.regular,
            fontSize: size,
            color: color || 'black',
            textAlign: textAlign,
        },
    });

    return (
    <Text style={styles.text} numberOfLines={numberOfLines}>
        {children}
    </Text>
    );
};


export default CustomText;