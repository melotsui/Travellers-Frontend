import { Image, StyleSheet, View } from "react-native";
import { screenWidth } from "../../constants/screen_dimension";
import g_THEME from "../../theme/theme";
import React from "react";

interface RoundRectImageProps {
    uri: string;
}

const RoundRectImage: React.FC<RoundRectImageProps> = ({ uri }) => {

    const styles = StyleSheet.create({
        container: {
            width: screenWidth * 0.21,
            height: 100,
            borderWidth: 1,
            borderColor: g_THEME.colors.grey,
            borderRadius: 5,
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


export default RoundRectImage;