import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import CustomText from '../atoms/text';

interface TripTileProps {
}

const TripTile: React.FC<TripTileProps> = ({ }) => {

    return (
        <View style={[styles.container, g_STYLE.column]}>
            <View style={[g_STYLE.row, {flex: 1}]}>
                <View style={styles.left}>
                    <CustomText size={25}>Japan Gogo</CustomText>
                </View>
                <View style={styles.right}>
                    <Image source={{ uri: 'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png' }} style={styles.image} />
                </View>
            </View>
                <View style={styles.textContainer}>
                    <CustomText>Osaka</CustomText>
                    <CustomText>20/12/2023 - 25/12/2023</CustomText>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: screenWidth * 0.85,
        marginVertical: 10,
        padding: 10,
        backgroundColor: g_THEME.colors.lightBlue,
        borderWidth: 2,
        borderColor: '#B1CDFD',
        borderRadius: 7,
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
    textContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});


export default TripTile;