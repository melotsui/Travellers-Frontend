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

interface BulletPointProps {
    name: string;
    isSelected: boolean;
}

const BulletPoint: React.FC<BulletPointProps> = ({ name, isSelected }) => {

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 15,
            paddingHorizontal: 10,
            width: '100%',
        },
        circle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: g_THEME.colors.secondary,
        },
        innerCircle: {
            position: 'absolute',
            top: 2,
            left: 2,
            width: 16,
            height: 16,
            borderRadius: 10,
            backgroundColor: g_THEME.colors.secondary,
        },
    });

    return (
        <View style={g_STYLE.row}>
            <View style={styles.container}>
                <View style={g_STYLE.row}>
                    <View>
                        <View style={styles.circle}></View>
                        {isSelected ? <View style={styles.innerCircle}></View> : null}
                    </View>
                    <View style={{ width: 20 }}></View>
                    <CustomText size={22}>{name}</CustomText>
                </View>
            </View>
        </View>

    );
};


export default BulletPoint;