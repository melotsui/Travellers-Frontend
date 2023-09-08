import { View, StyleSheet } from "react-native";
import CustomText from "../atoms/text";
import CircularImage from "../atoms/circular_image";
import g_STYLE from "../../styles/styles";

interface ImageTileProps {
    title: string;
    uri?: string;
    size?: number;
}

const ImageTile: React.FC<ImageTileProps> = ({
    title,
    uri,
    size = 20, }
) => {
    return (
        <View style={[styles.menuItem, g_STYLE.row]}>
            <CircularImage size={50} uri={uri}></CircularImage>
            <View style={{ width: 15 }}></View>
            <CustomText size={size}>{title}</CustomText>
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
});

export default ImageTile;