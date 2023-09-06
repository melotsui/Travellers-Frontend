import { StyleSheet, View } from "react-native";
import { screenWidth } from "../../constants/screen_dimension";
import g_THEME from "../../theme/theme";
import React from "react";
import CustomText from "./text";
import g_STYLE from "../../styles/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface RoundButtonProps {
    icon: string;
    title: string;
    color?: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({ icon, title, color }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: color ? color : g_THEME.colors.secondary,
            marginVertical: 5,
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
    });

    return (
        <View style={[styles.container, g_STYLE.row]}>
            <MaterialIcons name={icon} color='white' size={20} ></MaterialIcons>
            <View style={{ width: 10 }}></View>
            <CustomText color="white">{title}</CustomText>
        </View>
    );
}


export default RoundButton;