import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import ImageTile from '../molecules/image_tile';
import IconButton from '../atoms/icon_button';
import RoundButton from '../atoms/round_button';
import { isPending } from '@reduxjs/toolkit';
import GradientContainer from '../atoms/gradient_container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../atoms/text';
import SeparateLine from '../atoms/separate_line';

interface AccountTileProps {
    name: string;
    icon: string;
    onPress?: (index: number) => void
}

const AccountTile: React.FC<AccountTileProps> = ({ name, icon, onPress }) => {

    const handleTap = () => { onPress }

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 15,
            paddingHorizontal: 10,
        },
    });

    return (<>
        <SeparateLine isTextInclude={false} />

        <TouchableOpacity onPress={handleTap}>
            <View style={[styles.container, g_STYLE.row]}>
                <MaterialIcons name={icon} size={24} color={g_THEME.colors.secondary} />
                <View style={{ width: 15 }}></View>
                <CustomText size={22}>{name}</CustomText>
            </View>
        </TouchableOpacity>
    </>

    );
};


export default AccountTile;