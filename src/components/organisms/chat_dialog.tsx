import React from "react";
import { MediaTypes } from "../../constants/types";
import CircularImage from "../atoms/circular_image";
import g_STYLE from "../../styles/styles";
import { View } from "react-native";
import CustomText from "../atoms/text";
import { StyleSheet } from "react-native";
import g_THEME from "../../theme/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ChatDialogProps {
    name: string;
    uri: string;
    content: string;
    type: MediaTypes;
    onPress: () => void;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ name, uri, content, type, onPress }) => {

    const handleMedia = () => {
        onPress();
    }

    const InnerContent = () => {
        switch (type) {
            case MediaTypes.TEXT:
                return <CustomText size={20}>{content}</CustomText>;
            case MediaTypes.AUDIO:
                return <>
                    <View style={g_STYLE.row}>
                        <MaterialIcons name="headphones" size={24} color="black" />
                        <CustomText size={20}> {content}</CustomText>
                    </View></>;
            default:
                return <>
                    <View style={g_STYLE.row}>
                        <MaterialIcons name="download" size={24} color="black" />
                        <CustomText size={20}> {content}</CustomText>
                    </View></>
        }
    }

    return (<>
        {name != 'me' ?
            <View style={[g_STYLE.row, { justifyContent: 'flex-end' }]}>
                <View style={[g_STYLE.col, { alignItems: 'flex-end' }]}>
                    <CustomText size={20}>{name}</CustomText>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity onPress={handleMedia}>
                            <InnerContent />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.image}>
                    <CircularImage size={50} uri={uri}></CircularImage>
                </View>
            </View>
            :
            <View style={g_STYLE.row}>
                <View style={styles.image}>
                    <CircularImage size={50} uri={uri}></CircularImage>
                </View>
                <View style={g_STYLE.col}>
                    <CustomText size={20}>{name}</CustomText>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={handleMedia}>
                            <InnerContent />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
    </>
    );

};

const styles = StyleSheet.create({
    image: {
        marginVertical: 20,
    },
    container: {
        backgroundColor: g_THEME.colors.primary,
        padding: 10,
        marginRight: 80,
        marginLeft: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rightContainer: {
        backgroundColor: g_THEME.colors.primary,
        padding: 10,
        marginLeft: 80,
        marginRight: 10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
});

export default ChatDialog;