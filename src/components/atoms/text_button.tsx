import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react'
import g_THEME from '../../theme/theme';
import CustomText from './text';

interface TextButtonProps {
    text: string;
    onPress: () => void;
    color?: string;
    size?: number;
} 

const TextButton: React.FC<TextButtonProps> = ({text, onPress, color, size}) => {

    return (
            <TouchableOpacity onPress={onPress}>
                <CustomText size={size} data={text} color={color ?? g_THEME.colors.secondary} />
            </TouchableOpacity>
    );


};

export default TextButton;
