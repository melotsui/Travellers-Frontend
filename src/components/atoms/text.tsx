import React, { useState } from 'react';
import {  StyleSheet, Text } from 'react-native';
import g_THEME from '../../theme/theme';

interface TextFieldProps {
    data: string;
    size?: number;
    color?: string,
  }
  
const CustomText: React.FC<TextFieldProps> = ({data, size, color}) => {

    const styles =  StyleSheet.create({
        text: {
            fontFamily: g_THEME.fonts.regular,
            fontSize: size,
            color: color ?? 'black',
        },
    });

    return (
    <Text style={styles.text}>
        {data}
    </Text>
    );
};


export default CustomText;