import React, { useState } from 'react';
import {  StyleSheet, Text } from 'react-native';
import g_THEME from '../../theme/theme';

interface TextFieldProps {
    children: string;
    size?: number;
    color?: string,
  }
  
const CustomText: React.FC<TextFieldProps> = ({children, size, color}) => {

    const styles =  StyleSheet.create({
        text: {
            fontFamily: g_THEME.fonts.regular,
            fontSize: size,
            color: color || 'black',
        },
    });

    return (
    <Text style={styles.text}>
        {children}
    </Text>
    );
};


export default CustomText;