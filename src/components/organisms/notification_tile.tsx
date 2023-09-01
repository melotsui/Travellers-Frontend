import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import CustomText from '../atoms/text';

interface NotificationTileProps {
    content: string;
    name: string;
    datetime: string;
    isRead: boolean;
}

const NotificationTile: React.FC<NotificationTileProps> = ({
    content,
    name,
    datetime,
    isRead,
 }) => {
    const [showFull, setShowFull] = React.useState(false);

    const handleText = () => {
        setShowFull(!showFull);
    }

    const styles = StyleSheet.create({
        container: {
            width: screenWidth * 0.9,
            marginVertical: 5,
            padding: 10,
            backgroundColor: isRead ? g_THEME.colors.lightGrey : g_THEME.colors.lightBlue,
            borderWidth: 2,
            borderColor: isRead ? g_THEME.colors.grey : '#B1CDFD',
            borderRadius: 7,
        },
        topContainer: {
            flex: 1,
        },
        bottomContainer: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
    });

    return (
        <View style={[styles.container, g_STYLE.col]}>
            <TouchableOpacity onPress={handleText}>
            <View style={[g_STYLE.row, {flex: 1}]}>
                <View style={styles.topContainer}>
                    <CustomText size={18} numberOfLines={showFull ? 0 : 4}>{content}</CustomText>
                </View>
            </View>
                <View style={styles.bottomContainer}>
                    <CustomText>{name}</CustomText>
                    <CustomText>{datetime}</CustomText>
                </View>
                </TouchableOpacity>
        </View>
    );
};


export default NotificationTile;