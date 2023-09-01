import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import { NotesProps } from "../../navigation/stack_navigations/notes_stack_navigation";
import PartnerTile from "../../components/organisms/partner_tile";
import g_THEME from "../../theme/theme";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import IconButton from "../../components/atoms/icon_button";
import GradientButton from "../../components/molecules/gradient_button";

const NotesAccessScreen: React.FC<NotesProps<'NotesAccess'>> = (props) => {
    const [note, setNote] = useState('');
    const [partners, setPartners] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    const [partnersSelected, setPartnersSelected] = useState([false, false, false, false, false, false, false, false]);

    const handleSelect = (index: number) => {
        let temp = [...partnersSelected];
        temp[index] = !temp[index];
        setPartnersSelected(temp);
    }
    
    const handleSave = () => {
    }

    const handleDelete = () => {
    }

    return (
        <ScrollView>
            <CustomHeader title={"Partners"}></CustomHeader>
            <View style={styles.container}>
                <CustomText size={20}>Add Permission to Partner</CustomText>
            </View>
            <View style={styles.partnerContainer}>
                <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={partners}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleSelect(index)}>
                            <PartnerTile
                                name={"Samoyed Meme"}
                                uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}
                                isPending={false}
                                isSelect={partnersSelected[index]}></PartnerTile>
                        </TouchableOpacity>
                    )}
                /></View>
            <View style={[styles.saveButton, g_STYLE.row]}>
                <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                <GradientButton title={"Cancel"} onPress={handleDelete} color={g_THEME.colors.grey}></GradientButton>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        paddingTop: screenHeight * 0.02,
    },
    partnerContainer: {
        width: screenWidth,
        marginVertical: 10,
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 60,
    }
});

export default NotesAccessScreen;