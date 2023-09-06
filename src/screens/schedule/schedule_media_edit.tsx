import React, { ReactNode, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import g_THEME from "../../theme/theme";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import IconButton from "../../components/atoms/icon_button";
import GradientButton from "../../components/molecules/gradient_button";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
import SeparateLine from "../../components/atoms/separate_line";
import BottomSheetTile from "../../components/organisms/bottom_sheet_tile";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import { RootProps } from "../../navigation/screen_navigation_props";
import { openCamera, openGallery } from "../../utils/image_picker";
import { Image } from "react-native";
import { Asset } from "react-native-image-picker";
import apis from "../../api/api_service";
import { MediaLocalUrl } from "../../models/media";

const ScheduleMediaEditScreen: React.FC<RootProps<'ScheduleMediaEdit'>> = (props) => {
    const schedule_id = props.route.params.schedule_id;
    const originalMedia = props.route.params.media;
    const [partner, setPartner] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [media, setMedia] = useState<Asset | null>(null);
    const { setBottomSheetContent, showBottomSheet } = useBottomSheet();

    const content = (): ReactNode => {
        return <>
            <BottomSheetTile onPress={handleTakePhoto}>Take Photo</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>
            <BottomSheetTile onPress={handleGallery}>Select from Gallery</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>
            <BottomSheetTile onPress={handlePhotoDelete} color={g_THEME.colors.error}>Delete Photo</BottomSheetTile>
        </>
    }

    const handleTakePhoto = async () => {
        const media : Asset[] = await openCamera();
        setMedia(media[0]);
    }

    const handleGallery = async () => {
        const media : Asset[] = await openGallery();
        setMedia(media[0]);
    }

    const handlePhotoDelete = () => {
    }

    const handleAddMedia = () => {
        setBottomSheetContent(content());
        showBottomSheet();
    }

    const handlePartner = (value: string) => {
        setPartner(value);
    }

    const handleInvitePartner = () => {
        props.navigation.navigate('NotesAccess');
    }

    const handleSave = async () => {
        try {
            console.log("media", media);
            const promise1: Promise<Schedule> = apis.media.uploadScheduleMedia(media!, schedule_id!);
            const promise2: Promise<MediaLocalUrl> = apis.media.addLocalMedia(schedule_id!, media!.uri!)
            await Promise.all([promise1, promise2]);
            props.navigation.goBack();

        } catch (error) {
            // Handle any errors that occurred during the API calls
            console.error('Error:', error);
        }
        console.log(media);
    }

    const handleDelete = () => {
    }

    return (
        <PaperProvider>
            <ScrollView>
                <CustomHeader title={"Media"}></CustomHeader>
                <View style={styles.container}>
                    <View style={styles.mediaContainer}>
                        <View style={styles.media}>
                            <Image source={{ uri: media ? media?.uri :originalMedia?.media?.media_preview_url }} style={styles.image} />
                            <View style={styles.mediaButton}>
                                <IconButton icon={"add-a-photo"} size={40} color={'white'} onPress={handleAddMedia} ></IconButton>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.saveButton, g_STYLE.row]}>

                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                        {!isNew ?
                            <GradientPopupDialog isSelect={true} title={'Reminder'}>
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
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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

export default ScheduleMediaEditScreen;