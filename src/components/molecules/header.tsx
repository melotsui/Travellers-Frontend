import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import g_STYLE from "../../styles/styles";
import CustomText from "../atoms/text";

interface CustomHeaderProps {
    title: string;
    children?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    children
}) => {
    return (
        <View style={[styles.headerContainer, g_STYLE.row]}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <CustomText size={30}>{title}</CustomText>
            <View style={styles.headerButton}>
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
    headerContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerButton: {
        right: 10,
        position: 'absolute',
    }
});

export default CustomHeader;