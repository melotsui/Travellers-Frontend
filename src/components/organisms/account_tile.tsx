import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../atoms/text';

interface AccountTileProps {
    name: string;
    icon: string;
}

const AccountTile: React.FC<AccountTileProps> = ({ name, icon }) => {

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 15,
            paddingHorizontal: 10,
        },
    });

    return (
        <View style={[styles.container, g_STYLE.row]}>
            <MaterialIcons name={icon} size={24} color={g_THEME.colors.secondary} />
            <View style={{ width: 15 }}></View>
            <CustomText size={22}>{name}</CustomText>
        </View>

    );
};


export default AccountTile;