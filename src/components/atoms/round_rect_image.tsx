import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { screenWidth } from "../../constants/screen_dimension";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getMediaBackgroundColors, getMediaIconColors, getMediaIcons } from "../../helpers/media";
import { MediaTypes } from "../../constants/types";

interface RoundRectImageProps {
    uri?: string;
    type: MediaTypes;
    onPress?: () => void;
}

const RoundRectImage: React.FC<RoundRectImageProps> = ({ uri, type, onPress }) => {

    const handleMedia = () => {
        if (onPress != null) {
            onPress();
        }
    }

    const checkLocal = () => {
        if (uri && uri.includes('file://')) {
            return true;
        } else {
            return false;
        }
    }

    const styles = StyleSheet.create({
        container: {
            width: screenWidth * 0.21,
            height: 100,
            borderRadius: 5,
            backgroundColor: getMediaBackgroundColors(type),
            overflow: 'hidden'
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
        <TouchableOpacity onPress={handleMedia}>
            <View style={styles.container}>
                {uri != null ? <Image source={{ uri: uri }} style={styles.image} /> : null}
                {!checkLocal() && type != MediaTypes.OTHER ?
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={'download'} size={30} color={'white'} />
                    </View>
                    :
                    type != MediaTypes.IMAGE &&
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={getMediaIcons(type)} size={30} color={getMediaIconColors(type)} />
                    </View>}
            </View>
        </TouchableOpacity>
    );
}


export default RoundRectImage;