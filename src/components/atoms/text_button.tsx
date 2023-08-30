import { TouchableOpacity } from 'react-native';
import React from 'react'
import g_THEME from '../../theme/theme';
import CustomText from './text';

interface TextButtonProps {
    children: string;
    onPress: () => void;
    color?: string;
    size?: number;
} 

const TextButton: React.FC<TextButtonProps> = ({children, onPress, color, size}) => {

    return (
            <TouchableOpacity onPress={onPress}>
                <CustomText size={size} color={color ?? g_THEME.colors.secondary}>{children}</CustomText>
            </TouchableOpacity>
    );


};

export default TextButton;
