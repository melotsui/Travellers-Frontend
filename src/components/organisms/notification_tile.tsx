import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import CustomText from '../atoms/text';
import TextButton from '../atoms/text_button';
import GradientButton from '../molecules/gradient_button';
import Notification from '../../models/notification';
import { NotificationType } from '../../constants/types';

interface NotificationTileProps {
    content: string;
    datetime: string;
    isRead: boolean;
    isResponded: boolean | null;
    onConfirm?: () => void;
    onDisapprove?: () => void;
}

const NotificationTile: React.FC<NotificationTileProps> = ({
    content,
    datetime,
    isRead,
    isResponded,
    onConfirm,
    onDisapprove,
}) => {
    const [showFull, setShowFull] = React.useState(false);

    const handleText = () => {
        setShowFull(!showFull);
    }

    const handleConfirm = () => {
        onConfirm && onConfirm();
    }

    const handleDisapprove = () => {
        onDisapprove && onDisapprove();
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
        select: {
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (
        <View style={[styles.container, g_STYLE.col]}>
            <TouchableOpacity onPress={handleText}>
                <View style={[g_STYLE.row, { flex: 1 }]}>
                    <View style={styles.topContainer}>
                        <CustomText size={18} numberOfLines={showFull ? 0 : 4}>{content}</CustomText>
                    </View>
                </View>
                {isResponded === false &&
                    <View style={[g_STYLE.row, styles.select]}>
                        <GradientButton size={15} title={'Confirm'} onPress={handleConfirm}/>
                        <GradientButton size={15} color={g_THEME.colors.grey} title={'Disapprove'} onPress={handleDisapprove}/>
                    </View>
                }
                <View style={styles.bottomContainer}>
                    <CustomText>{datetime}</CustomText>
                </View>
            </TouchableOpacity>
        </View>
    );
};


export default NotificationTile;