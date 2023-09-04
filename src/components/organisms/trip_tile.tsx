import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import CustomText from '../atoms/text';
import CircularImage from '../atoms/circular_image';
import { formatDate, getDate } from '../../utils/datetime_formatter';

interface TripTileProps {
    trip: Trip;
}

const TripTile: React.FC<TripTileProps> = ({ trip }) => {

    return (
        <View style={[styles.container, g_STYLE.col]}>
            <View style={[g_STYLE.row, {flex: 1}]}>
                <View style={styles.leftContainer}>
                    <CustomText size={25}>{trip.trip_name}</CustomText>
                </View>
                <View style={styles.rightContainer}>
                    
                <CircularImage size={screenWidth * 0.15} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                    {/*<Image source={{ uri: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} style={styles.image} />*/}
                </View>
            </View>
                <View style={styles.textContainer}>
                    <CustomText>{trip.trip_destination}</CustomText>
                    <CustomText>{getDate(trip.trip_datetime_from)} - {getDate(trip.trip_datetime_to)}</CustomText>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: screenWidth * 0.85,
        marginVertical: 3,
        padding: 10,
        backgroundColor: g_THEME.colors.lightBlue,
        borderWidth: 2,
        borderColor: '#B1CDFD',
        borderRadius: 7,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainer: {
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