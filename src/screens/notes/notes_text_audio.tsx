import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { NotesProps } from "../../navigation/stack_navigations/notes_stack_navigation";
import PartnerTile from "../../components/organisms/partner_tile";
import g_THEME from "../../theme/theme";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import IconButton from "../../components/atoms/icon_button";
import GradientButton from "../../components/molecules/gradient_button";
import { set } from "immer/dist/internal";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";

const NotesTextAudioScreen: React.FC<NotesProps<'NotesTextAudio'>> = (props) => {
    const [note, setNote] = useState('');
    const [partner, setPartner] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [audio, setAudio] = useState('');

    const handleNote = (value: string) => {
        setNote(value);
    }

    const handleNoteSuffix = () => {
        if (note.length > 0 || audio.length > 0) {
            setNote('');
            setAudio('');
        } else {
            console.log('start recording');
            setAudio('0:10');
        }
    }

    const handleNoteIcon = (): string => {
        if (note.length > 0 || audio.length > 0) {
            return 'close';
        } else {
            return 'mic';
        }
    }

    const handleNoteIconColor = (): string => {
        if (note.length > 0 || audio.length > 0) {
            return g_THEME.colors.grey;
        } else {
            return g_THEME.colors.error;
        }
    }

    const handlePartner = (value: string) => {
        setPartner(value);
    }

    const handleInvitePartner = () => {
        props.navigation.navigate('NotesAccess');
    }

    const handleSave = () => {
    }

    const handleDelete = () => {
    }

    return (
        <PaperProvider>
        <ScrollView>
            <CustomHeader title={"Text/Audio"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.mediaContainer}>
                    <TextField
                        hint="Write down your wonderful moment in your trip!"
                        text={audio.length > 0 ? audio : note}
                        onChange={handleNote}
                        onPress={handleNoteSuffix}
                        numberOfLines={audio.length > 0 ? 1 : 6}
                        prefixIcon={audio.length > 0 ? 'headphones' : undefined}
                        suffixIcon={handleNoteIcon()}
                        suffixIconColor={handleNoteIconColor()} />
                </View>
                <View style={[styles.partnerContainer, g_STYLE.row]}>
                    <CustomText size={25}>Accessible Partners</CustomText>
                    <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
                </View>
                <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                    renderItem={({ item }) => (
                        <PartnerTile
                            name={"Samoyed Meme"}
                            uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}
                            onPress={handleInvitePartner}
                            isPending={false}></PartnerTile>
                    )}
                />
                <View style={[styles.saveButton, g_STYLE.row]}>
                    <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                    {!isNew ?
                        <GradientPopupDialog isSelect={true} title={'Reminder'} onPress={handleDelete}>
                            {[
                                <GradientButton title={"Delete"} color={g_THEME.colors.error}></GradientButton>,
                                <CustomText size={20}>Are you sure to delete? You can no longer undo your note</CustomText>
                            ]}
                        </GradientPopupDialog>
                        : null}
                </View>
            </View>
        </ScrollView>
        </PaperProvider>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        paddingTop: screenHeight * 0.02,
    },
    mediaContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    media: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.7,
        backgroundColor: g_THEME.colors.grey,
        borderRadius: 10,
    },
    mediaButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        color: 'white',
    },
    partnerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    partner: {
        width: '90%'
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 60,
    }
});

export default NotesTextAudioScreen;