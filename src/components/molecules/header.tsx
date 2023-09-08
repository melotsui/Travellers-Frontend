import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import g_STYLE from "../../styles/styles";
import IconButton from "../atoms/icon_button";
import CustomText from "../atoms/text";

interface CustomHeaderProps {
    title: string;
    children?: React.ReactNode;
    isLogo?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    children,
    isLogo
}) => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <View style={[styles.headerContainer, g_STYLE.row]}>
            {isLogo ?
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                /> :
                <View style={styles.back}>
                    <IconButton icon={"arrow-back-ios"} onPress={handleBack}></IconButton>
                </View>}
            <CustomText size={30}>{title}</CustomText>
            <View style={[styles.headerButton, g_STYLE.row]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        left: 10,
        position: 'absolute'
    },
    back: {
        width: 60,
        height: 60,
        left: 25,
        top: 15,
        position: 'absolute'
    },
    headerContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    headerButton: {
        right: 10,
        position: 'absolute',
    }
});

export default CustomHeader;