import { Image, StyleSheet, View } from "react-native";
import { screenWidth } from "../../constants/screen_dimension";
import g_THEME from "../../theme/theme";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "./text";
import g_STYLE from "../../styles/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import getActivityIcon from "../../helpers/activity_icon";
import { ActivityTypes } from "../../constants/types";

interface RoundButtonProps {
    icon: string;
    title: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({ icon, title }) => {

    const styles = StyleSheet.create({
        container: {
            width: screenWidth * 0.2,
            backgroundColor: g_THEME.colors.secondary,
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
            <CustomText color="white">{title}</CustomText>
        </View>
    );
}


export default RoundButton;