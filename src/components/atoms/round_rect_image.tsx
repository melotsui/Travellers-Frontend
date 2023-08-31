import { Image, StyleSheet, View } from "react-native";
import { screenWidth } from "../../constants/screen_dimension";
import g_THEME from "../../theme/theme";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getMediaIconColors, getMediaIcons } from "../../helpers/media_icon";
import { MediaTypes } from "../../constants/types";

interface RoundRectImageProps {
    uri: string;
    type: MediaTypes;
}

const RoundRectImage: React.FC<RoundRectImageProps> = ({ uri, type }) => {

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
        iconContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -15 }, { translateY: -15 }],
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            width: 30,
            height: 30,
        },
    });

    return (
        <View style={styles.container}>
            <Image source={{ uri: uri }} style={styles.image} />
            {type != MediaTypes.IMAGE && <View style={styles.iconContainer}>
                <MaterialIcons name={getMediaIcons(type)} size={30} color={getMediaIconColors(type)} />
            </View>}
        </View>
    );
}


export default RoundRectImage;