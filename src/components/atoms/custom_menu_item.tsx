import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomText from "./text";

interface CustomMenuItemProps {
    title: string;
    onPress?: () => void;
    icon: string;
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
    title,
    onPress,
    icon }
) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.menuItem}>
                <MaterialIcons name={icon} size={20} color={'white'} />
                <View style={{width: 10}}></View>
                <CustomText color="white" size={20}>{title}</CustomText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
});

export default CustomMenuItem;