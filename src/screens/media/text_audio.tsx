import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import PartnerTile from "../../components/organisms/partner_tile";
import g_THEME from "../../theme/theme";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import IconButton from "../../components/atoms/icon_button";
import GradientButton from "../../components/molecules/gradient_button";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
import { RootProps } from "../../navigation/screen_navigation_props";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import audio_controller from "../../controllers/audio_controller";
import { is } from "immer/dist/internal";
import { formatDuration } from "../../utils/datetime_formatter";
import { DispatchThunk } from "../../store/store";
import { useDispatch } from "react-redux";
import { deleteMedia, addMedia } from "../../actions/media_actions";
import media from "./media";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import { Asset } from "react-native-image-picker";

const TextAudioScreen: React.FC<RootProps<'TextAudio'>> = (props) => {
    const { schedule_id } = props.route.params;
    const [note, setNote] = useState('');
    const rAudio = props.route.params.audio;
    const [partner, setPartner] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudio, setIsAudio] = useState(true);
    const [duration, setDuration] = useState(0);
    const [filePath, setFilePath] = useState<string | null>(null);
    const { setBottomSheetContent, showBottomSheet, hideBottomSheet } = useBottomSheet();
    const dispatch: DispatchThunk = useDispatch();

    const handleNote = (value: string) => {
        setNote(value);
    }

    const handleNoteSuffix = () => {
        if (note.length > 0 || duration > 0) {
            if (isAudio) {
                setDuration(0);
                setFilePath(null);
                if (isRecording) {
                    handleStopRecord();
                } else if (isPlaying) {
                    handleStopPlay();
                }
            } else {
                setNote('');
            }
        }

        //setIsAudio(!isAudio);
    }
    useEffect(() => {
        if (rAudio?.media_local_url) {
            console.log("rAudio.media_local_url.media_local_url");
            console.log(rAudio.media_local_url.media_local_url);
            console.log("rAudio.media");
            audio_controller.getAudioFileInfo(rAudio.media_local_url.media_local_url).then((duration) => {
                console.log(duration);  
                setDuration(duration);
            });
            setFilePath(rAudio.media_local_url.media_local_url);
        }
        // Set the listener for audio updates
        audio_controller.setAudioListener({
            onUpdate: (currentDuration: number) => {
                setDuration(Math.floor(currentDuration / 1000));  // Convert to seconds
            },
        });

        return () => {
            // Cleanup the listener on component unmount
            audio_controller.setAudioListener({ onUpdate: () => { } });
        };
    }, []);

    const handleStartRecord = async () => {
        const path = await audio_controller.startRecording();
        setFilePath(path);
        setIsRecording(true);
    };

    const handleStopRecord = async () => {
        await audio_controller.stopRecording();
        setIsRecording(false);
    };

    const handleStartPlay = async () => {
        if (!filePath) return;
        await audio_controller.startPlay(filePath);
        setIsPlaying(true);
    };

    const handleStopPlay = async () => {
        await audio_controller.stopPlay();
        setIsPlaying(false);
    };

    const handleText = (): string => {
        if (isAudio) {
            if (duration > 0) {
                if (isRecording) {
                    return "Recording... [" + formatDuration(duration) + "]";
                } else if (isPlaying) {
                    return "Playing... [" + formatDuration(duration) + "]";
                } else {
                    return "Press to Play [" + formatDuration(duration) + "]";
                }
            } else {
                return "Press to Record";
            }
        } else {
            return note;
        }

    }

    const handleTextPress = () => {
        if (isAudio) {
            if (filePath == null) {
                return handleStartRecord;
            } else if (isRecording) {
                return handleStopRecord;
            } else if (isPlaying) {
                return handleStopPlay;
            } else {
                return handleStartPlay;
            }
        }
        isAudio ? isRecording ? handleStopRecord : handleStartRecord : undefined
    }

    const handleAudio = () => {
        //setIsAudio(true);
    }

    const handleNoteIcon = (): string | undefined => {
        if(rAudio){
            return undefined;
        } else if (note.length > 0 || isAudio) {
            return 'close';
        } else {
            return undefined;
            //return 'mic';
        }
    }

    const handleNoteIconColor = (): string => {
        if (note.length > 0 || isAudio) {
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

    const handleSave = async () => {
        try {
            if (isRecording) return;
            if (!filePath || !schedule_id) return;
            dispatch(deleteMedia(rAudio?.media?.media_id!, true));
            audio_controller.extractAudio(filePath);
            const file: Asset = {
                uri: filePath.replace('.mp4', '.wav'),
                fileName: filePath.split('/').pop()!.replace('.mp4', '.wav'),
                type: 'audio/wav',
            }
            dispatch(addMedia(file, schedule_id));

        } catch (error) {
            // Handle any errors that occurred during the API calls
            console.error('Error:', error);
        }
        console.log(media);
    }

    const handleDelete = () => {
        if (!rAudio?.media?.media_id) return;
        dispatch(deleteMedia(rAudio?.media?.media_id, false));
        hideBottomSheet();
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
            marginLeft: duration > 0 || note.length > 0 ? 0 : 10,
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

    return (
        <PaperProvider>
            <ScrollView>
                <CustomHeader title={"Text/Audio"}></CustomHeader>
                <View style={styles.container}>
                    <View style={[styles.mediaContainer, g_STYLE.row]}>
                        <TextField
                            hint="Write down your wonderful moment in your trip!"
                            text={handleText()}
                            onChange={handleNote}
                            onPress={handleNoteSuffix}
                            onPressText={handleTextPress()}
                            multiline={true}
                            prefixIcon={isAudio ? 'headphones' : undefined}
                            suffixIcon={handleNoteIcon()}
                            suffixIconColor={handleNoteIconColor()} />
                        {isAudio ? null : <IconButton icon={"mic"} color={g_THEME.colors.error} onPress={handleAudio}></IconButton>}
                    </View>
                    {/* <View style={[styles.partnerContainer, g_STYLE.row]}>
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
                    /> */}
                    <View style={[styles.saveButton, g_STYLE.row]}>
                        {!rAudio &&<GradientButton title={"Save"} onPress={handleSave}></GradientButton>}
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

export default TextAudioScreen;