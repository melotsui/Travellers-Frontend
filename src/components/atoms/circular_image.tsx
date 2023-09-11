import { Image, StyleSheet, View } from "react-native";
import g_THEME from "../../theme/theme";
import React from "react";

interface CircularImageProps {
    size: number;
    uri?: string;
    noDefault?: boolean;
}

const CircularImage: React.FC<CircularImageProps> = ({ size, uri, noDefault }) => {

    const styles = StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderWidth: uri ? 2 : 0,
            borderColor: g_THEME.colors.grey,
            borderRadius: size / 2,
            overflow: 'hidden',
            backgroundColor: noDefault ? g_THEME.colors.grey : undefined,
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
    });

    return (
        <View style={styles.container}>
            <Image source={ noDefault? '' : uri ? { uri: uri } : require('../../assets/profile-user.png') } style={styles.image} />

        </View>
    );
}


export default CircularImage;