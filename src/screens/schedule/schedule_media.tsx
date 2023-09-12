import React, { ReactNode, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import g_THEME from "../../theme/theme";
import { MediaTypes } from "../../constants/types";
import RoundRectImage from "../../components/atoms/round_rect_image";
import IconButton from "../../components/atoms/icon_button";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import BottomSheetTile from "../../components/organisms/bottom_sheet_tile";
import SeparateLine from "../../components/atoms/separate_line";
import { RootProps } from "../../navigation/screen_navigation_props";
import { MediaMediaLocalUrl } from "../../models/media_media_local_url";
import { useDispatch, useSelector } from "react-redux";
import { DispatchThunk } from "../../store/store";
import { downloadMedia, fetchMedia } from "../../actions/media_actions";
import ImageViewer from "../../components/organisms/image_viewer";
import { mediaSelector } from "../../slices/media_slice";
import { ScrollView } from "react-native-gesture-handler";
import { generateThumbnail } from "../../utils/media_process";

const ScheduleMediaScreen: React.FC<RootProps<'ScheduleMedia'>> = (props) => {
    const { schedule_id } = props.route.params;
    const dispatch: DispatchThunk = useDispatch();
    const [media, setMedia] = useState<MediaMediaLocalUrl[]>([]);
    const rMedia = useSelector(mediaSelector).media;
    const [searchText, setSearchText] = useState('');
    const [isTextAudio, setIsTextAudio] = useState(true);
    const [numColumns, setNumColumns] = useState(4);
    const { showBottomSheet, hideBottomSheet, setBottomSheetContent } = useBottomSheet();

    useEffect(() => {

        dispatch(fetchMedia(schedule_id));

        rMedia.forEach((media) => {
            console.log(media.media_local_url);
        })
        return () => {
            // Perform any cleanup tasks here if necessary
        };
    }, []);

    useEffect(() => {
        setMedia(rMedia);
    }, [rMedia]);


    const content = (): ReactNode => {
        return <>
            <BottomSheetTile onPress={handleAudioAdd}>Audio</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>
            <BottomSheetTile onPress={handleMediaAdd}>Media</BottomSheetTile>
        </>
    }

    const handleAudioAdd = () => {
        props.navigation.navigate('TextAudio', { schedule_id: schedule_id, note_id: null, audio: null, content: null });
        hideBottomSheet();
    }

    const handleMediaAdd = () => {
        props.navigation.navigate('Media', { schedule_id: schedule_id, note_id: null, media: null });
        hideBottomSheet();
    }

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    }

    const handleAdd = () => {
        setBottomSheetContent(content());
        showBottomSheet();
    }

    const handleBookmark = () => {
    }

    const handleTextAudioPress = () => {
        setIsTextAudio(true);
        //props.navigation.navigate('TripDetail');
    }
    const handleMediaPress = () => {
        setIsTextAudio(false);
        //props.navigation.navigate('TripDetail');
    }

    const handleAudio = (media: MediaMediaLocalUrl) => {
    }

    const handleMediaShow = (url: string, type: MediaTypes): string => {
        if (type == MediaTypes.VIDEO) {
            generateThumbnail(url).then((thumbnail) => {
                return thumbnail;
            }).catch((error) => {
                console.log(error);
                return url;
            });
            return url;
        }else{
            return url;
            }
    }

    const handleMedia = (media: MediaMediaLocalUrl) => {
        if (media.media_local_url == null) {
            dispatch(downloadMedia(media.media?.media_id!));
        }
    }


    return (

        <View>
            <CustomHeader title={"Schedule Media"}>
                <IconButton onPress={handleAdd} icon={"add"} />
                {/* <View style={{ width: 10 }}></View>
                <IconButton onPress={handleBookmark} icon={"bookmark-outline"} /> */}
            </CustomHeader>
            <ScrollView>
                <View style={styles.container}>
                    {/* <View style={styles.text}>
                        <TextField hint={"Trip title, type and place"} text={searchText} onChange={handleSearchTextChange} suffixIcon={'search'} />
                    </View> */}

                    <FlatList
                    scrollEnabled={false}
                        numColumns={numColumns}
                        key={numColumns} // Use numColumns as the key prop
                        keyExtractor={(item) => item.media!.media_id.toString()}
                        showsVerticalScrollIndicator={false}
                        data={media}
                        renderItem={({ item }) => (
                            <View style={styles.image}>
                                {item.media_local_url != null ?
                                    <ImageViewer media={media} schedule_id={schedule_id}>
                                        <RoundRectImage
                                            type={item.media?.media_type!}
                                            uri={handleMediaShow(item.media_local_url.media_local_url, item.media?.media_type!)}></RoundRectImage>
                                    </ImageViewer> :
                                    <RoundRectImage
                                        type={item.media?.media_type!}
                                        onPress={() => handleMedia(item)}
                                        uri={handleMediaShow(item.media?.media_preview_url!, item.media?.media_type!)}></RoundRectImage>


                                }

                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: screenHeight * 0.02,
    },
    text: {
        paddingHorizontal: screenWidth * 0.05,
    },
    chatDialog: {
        width: screenWidth * 0.9,
    },
    image: {
        margin: 5
    }
});

export default ScheduleMediaScreen;
