import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenWidth } from "../../constants/screen_dimension";
import { HomeProps } from "../../navigation/stack_navigations/trip_stack_navigation";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import SeparateLine from "../../components/atoms/separate_line";
import CircularImage from "../../components/atoms/circular_image";
import GradientButton from "../../components/molecules/gradient_button";
import g_THEME from "../../theme/theme";
import RoundRectImage from "../../components/atoms/round_rect_image";
import ScheduleTile from "../../components/organisms/schedule_tile";
import { ActivityTypes, MediaTypes } from "../../constants/types";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import { PaperProvider } from "react-native-paper";
import GradientPopupMenu from "../../components/molecules/gradient_menu";
import CustomMenuItem from "../../components/atoms/custom_menu_item";

const TripDetailScreen: React.FC<HomeProps<'TripDetail'>> = (props) => {
    const [schedules, setSchedules] = useState(['a']);

    const handleEdit = () => {
        props.navigation.navigate('TripEdit');
    }
    const handleAddSchedule = () => {
        console.log("add schdule");
        //props.navigation.navigate('TripDetail');
    }
    const handleShare = () => {
        console.log("share trip");
        //props.navigation.navigate('TripDetail');
    }
    const handleDelete = () => {
        console.log("delete trip");
        //props.navigation.navigate('TripDetail');
    }

    const handleScheduleTileChange = () => {
        props.navigation.navigate('Schedule');
    }

    return (
        <PaperProvider>
            <CustomHeader title={"Japan Gogo"}>
                <IconButton onPress={function (): void {
                    throw new Error("Function not implemented.");
                }} icon={"pin-drop"} />
                <View style={{ width: 10 }}></View>
                <GradientPopupMenu>
                    <CustomMenuItem title={"Edit"} onPress={handleEdit} icon={"edit"} />
                    <CustomMenuItem title={"Add Schedule"} onPress={handleAddSchedule} icon={"edit-calendar"} />
                    <CustomMenuItem title={"Share"} onPress={handleShare} icon={"share"} />
                    <CustomMenuItem title={"Delete"} onPress={handleDelete} icon={"delete-outline"} />
                </GradientPopupMenu>
            </CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <View>
                        <View style={g_STYLE.row}>
                            <View style={[g_STYLE.col, styles.leftContainer]}>
                                <CustomText size={25}>Osaka</CustomText>
                                <CustomText>20/12/2023 - 25/12/2023</CustomText>
                            </View>
                            <View style={styles.rightContainer}>
                                <CircularImage size={screenWidth * 0.15} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                                {/*<Image source={{ uri: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} style={styles.image} />*/}
                            </View>
                        </View>
                        <View style={styles.description}>
                            <CustomText>Trip of Samoyed Meme and Master Vivi</CustomText>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            ItemSeparatorComponent={() =>
                                <View style={{ width: screenWidth * 0.02 }}></View>
                            }
                            data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                            renderItem={({ item, index }) => {
                                if (index == 0) {
                                    return <RoundRectImage type={MediaTypes.OTHER}></RoundRectImage>
                                } else {
                                    return <RoundRectImage type={MediaTypes.IMAGE} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}></RoundRectImage>
                                }
                            }}
                        ></FlatList>
                    </View>
                    <View style={styles.space}></View>
                    <SeparateLine isTextInclude={false} />
                    <View style={styles.space}></View>
                    {schedules.length == 0 &&
                        <View style={styles.lowerContainer}>
                            <CustomText size={25} textAlign={'center'}>Your Trip is empty{'\n'}Let's add schedule !!</CustomText>
                            <View style={styles.space}></View>
                            <GradientButton size={20} title={"Add Schedule"} radius={35} onPress={handleAddSchedule} />
                        </View>}

                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View style={{ height: 5 }}></View>
                        }
                        data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                        renderItem={({ item, index }) => (
                            <ScheduleTile
                                step={index}
                                title={"Dotombori District"}
                                subTitle={"Sushiro"}
                                date={"20/12/2023"}
                                time={"10:00 - 12:00"}
                                type={ActivityTypes.FOOD}
                                transportTime={"15 mins"}
                                onPress={handleScheduleTileChange} />
                        )}>
                    </FlatList>
                </View>
            </ScrollView>
        </PaperProvider>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    description: {
        backgroundColor: g_THEME.colors.lightBlue,
        borderRadius: 5,
        padding: 5,
    },
    leftContainer: {
        flex: 3,
        justifyContent: 'flex-end',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    space: {
        height: 10,
    },
    lowerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    }
});

export default TripDetailScreen;