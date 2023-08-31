import { Image, StyleSheet, View } from "react-native";
import { screenWidth } from "../../constants/screen_dimension";
import g_THEME from "../../theme/theme";
import React from "react";

interface CircularImageProps {
    size: number;
    uri: string;
    borderWidth?: number;
}

const CircularImage: React.FC<CircularImageProps> = ({ size, uri, borderWidth }) => {

    const styles = StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderWidth: 2,
            borderColor: g_THEME.colors.grey,
            borderRadius: size / 2,
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
    });

    return (
        <View style={styles.container}>
            <Image source={{ uri: uri }} style={styles.image} />

        </View>
    );
}


export default CircularImage;