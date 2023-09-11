import React, { ReactNode, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
import SeparateLine from "../../components/atoms/separate_line";
import BottomSheetTile from "../../components/organisms/bottom_sheet_tile";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import { RootProps } from "../../navigation/screen_navigation_props";
import { openCamera, openGallery } from "../../utils/image_picker";
import { Image } from "react-native";
import { Asset, MediaType } from "react-native-image-picker";
import apis from "../../api/api_service";
import { MediaLocalUrl } from "../../models/media_local_url";
import { DispatchThunk } from "../../store/store";
import { useDispatch } from "react-redux";
import { addMedia, deleteMedia, fetchMedia } from "../../actions/media_actions";

const MediaScreen: React.FC<RootProps<'Media'>> = (props) => {
    const { schedule_id } = props.route.params;
    const rMedia = props.route.params.media;
    const [partner, setPartner] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [media, setMedia] = useState<Asset | null>(null);
    const { setBottomSheetContent, showBottomSheet, hideBottomSheet } = useBottomSheet();
    const dispatch: DispatchThunk = useDispatch();

    const content = (): ReactNode => {
        return <>
            <BottomSheetTile onPress={() => handleTakePhoto("video")} key={0.1}>Take Video</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary} key={0.2}></SeparateLine>
            <BottomSheetTile onPress={() => handleTakePhoto("photo")} key={1.1}>Take Photo</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary} key={1.2}></SeparateLine>
            <BottomSheetTile onPress={handleGallery} key={2.1}>Select from Gallery</BottomSheetTile>
            {rMedia ?
                <GradientPopupDialog isSelect={true} title={'Reminder'} onPress={handleDelete} key={3.1}>
                    {[<>
                        <SeparateLine isTextInclude={false} color={g_THEME.colors.primary} key={3.2}></SeparateLine>
                        <BottomSheetTile color={g_THEME.colors.error} key={3.3}>Delete Photo</BottomSheetTile></>,
                    <CustomText size={20} key={3.4}>Are you sure to delete? You can no longer undo your note</CustomText>
                    ]}
                </GradientPopupDialog>
                : null}
        </>
    }

    const handleTakePhoto = async (type: MediaType) => {
        const media: Asset[] = await openCamera(type);
        setMedia(media[0]);
    }

    const handleGallery = async () => {
        const media: Asset[] = await openGallery();
        setMedia(media[0]);
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
            if (!media || !schedule_id) return;
            dispatch(deleteMedia(rMedia?.media?.media_id!, true));
            dispatch(addMedia(media, schedule_id));

        } catch (error) {
            // Handle any errors that occurred during the API calls
            console.error('Error:', error);
        }
        console.log(media);
    }

    const handleDelete = () => {
        if (!rMedia?.media?.media_id) return;
        dispatch(deleteMedia(rMedia?.media?.media_id, false));
        hideBottomSheet();
    }

    return (
        <PaperProvider>
            <ScrollView>
                <CustomHeader title={"Media"}></CustomHeader>
                <View style={styles.container}>
                    <View style={styles.mediaContainer}>
                        <View style={styles.media}>
                            <Image source={{ uri: media?.uri ?? rMedia?.media_local_url?.media_local_url ?? rMedia?.media?.media_preview_url }} style={styles.image} />
                            <View style={styles.mediaButton}>
                                <IconButton icon={"add-a-photo"} size={40} color={'white'} onPress={handleAddMedia} ></IconButton>
                            </View>
                        </View>
                    </View>
                    {!schedule_id && <><View style={[styles.partnerContainer, g_STYLE.row]}>
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
                        /></>}
                    <View style={[styles.saveButton, g_STYLE.row]}>

                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                        {/* {!isNew ?
                            <GradientPopupDialog isSelect={true} title={'Reminder'} onPress={handleDelete}>
                                {[
                                    <GradientButton title={"Delete"} color={g_THEME.colors.error}></GradientButton>,
                                    <CustomText size={20}>Are you sure to delete? You can no longer undo your note</CustomText>
                                ]}
                            </GradientPopupDialog>
                            : null}*/}
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

export default MediaScreen;