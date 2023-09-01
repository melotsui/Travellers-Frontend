import { TouchableOpacity } from 'react-native';
import React from 'react'
import g_THEME from '../../theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconButtonProps {
    onPress: () => void;
    icon: string;
    color?: string;
    size?: number;
} 

const IconButton: React.FC<IconButtonProps> = ({onPress, icon, size, color}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialIcons name={icon} size={size ? size : 30} color={color ? color : g_THEME.colors.secondary} />
        </TouchableOpacity>
    );
};

export default IconButton;