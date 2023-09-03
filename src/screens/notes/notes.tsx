import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import TextField from "../../components/molecules/text_field";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import { NotesProps } from "../../navigation/stack_navigations/notes_stack_navigation";
import GradientButton from "../../components/molecules/gradient_button";
import g_STYLE from "../../styles/styles";
import g_THEME from "../../theme/theme";
import ChatDialog from "../../components/organisms/chat_dialog";
import { MediaTypes } from "../../constants/types";
import RoundRectImage from "../../components/atoms/round_rect_image";
import IconButton from "../../components/atoms/icon_button";
const NotesScreen: React.FC<NotesProps<'Notes'>> = (props) => {
    const [searchText, setSearchText] = useState('');
    const [isTextAudio, setIsTextAudio] = useState(true);
    const [numColumns, setNumColumns] = useState(4);

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    }

    const handleAddNote = () => {
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

    const handleTextAudio = () => {
        props.navigation.navigate('NotesTextAudio');
    }

    const handleMedia = () => {
        props.navigation.navigate('NotesMedia');
    }

    return (
        <View>
            <CustomHeader title={"Note"}>
                <IconButton onPress={handleBookmark} icon={"add"} />
                <View style={{ width: 10 }}></View>
                <IconButton onPress={handleBookmark} icon={"bookmark-outline"} />
            </CustomHeader>
            <View>
                <View style={styles.container}>
                    <View style={styles.text}>
                        <TextField hint={"Trip title, type and place"} text={searchText} onChange={handleSearchTextChange} suffixIcon={'search'} />
                    </View>
                    <View style={g_STYLE.row}>
                        <GradientButton title={"Text/Audio"} onPress={handleTextAudioPress} color={isTextAudio ? undefined : g_THEME.colors.lightGrey} textColor={isTextAudio ? undefined : "black"} width={0.4} />
                        <GradientButton title={"Media"} onPress={handleMediaPress} color={!isTextAudio ? undefined : g_THEME.colors.lightGrey} textColor={!isTextAudio ? undefined : "black"} width={0.4} />
                    </View>
                    
                    {isTextAudio ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                            renderItem={({ item }) => (
                                <View style={styles.chatDialog}>
                                    <ChatDialog
                                        name={"Corgi Meme"}
                                        content="I'm a corgi!"
                                        uri="https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                                        type={MediaTypes.AUDIO}
                                        onPress={handleTextAudio}></ChatDialog>
                                </View>
                            )}
                        />
                        :
                        <FlatList
                            numColumns={numColumns}
                            key={numColumns} // Use numColumns as the key prop
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                            renderItem={({ item }) => (
                                <View style={styles.image}>
                                    <RoundRectImage
                                        type={MediaTypes.IMAGE}
                                        onPress={handleMedia}
                                        uri="https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"></RoundRectImage>

                                </View>
                            )}
                        />
                            }
                </View>
            </View>
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

export default NotesScreen;