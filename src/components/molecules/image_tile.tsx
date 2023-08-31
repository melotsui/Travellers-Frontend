import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomText from "../atoms/text";
import CircularImage from "../atoms/circular_image";
import g_STYLE from "../../styles/styles";

interface ImageTileProps {
    title: string;
    uri: string;
}

const ImageTile: React.FC<ImageTileProps> = ({
    title,
    uri }
) => {
    return (
        <View style={[styles.menuItem, g_STYLE.row]}>
            <CircularImage size={50} uri={uri}></CircularImage>
            <View style={{ width: 15 }}></View>
            <CustomText size={20}>{title}</CustomText>
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