import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react'
import g_THEME from '../../theme/theme';
import CustomText from './text';

interface TextButtonProps {
    text: string;
    onPress: () => void;
} 

const TextButton: React.FC<TextButtonProps> = ({text, onPress}) => {

    return (
            <TouchableOpacity onPress={onPress}>
                <CustomText data={text} color={g_THEME.colors.secondary} />
            </TouchableOpacity>
    );


};

export default TextButton;
