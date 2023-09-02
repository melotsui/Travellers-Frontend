import React, { useState } from "react";
import { View, StyleSheet, FlatList, Button, Text } from "react-native";
import { RectButton, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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
import { Dialog, PaperProvider, Portal } from "react-native-paper";
import RoundButton from "../../components/atoms/round_button";
import ImageTile from "../../components/molecules/image_tile";
import getActivityIcon from "../../helpers/activity_icon";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";

const ScheduleScreen: React.FC<HomeProps<'Schedule'>> = (props) => {
    const [schedules, setSchedules] = useState(['a']);

    const handleEdit = () => {
        props.navigation.navigate('ScheduleEdit');
    }

    const handleNavigation = () => {
        console.log("navigate");
        //props.navigation.navigate('TripDetail');
    }

    const handleReminder = () => {
        console.log("set reminder");
        //props.navigation.navigate('TripDetail');
    }

    const handleAddMedia = () => {
        console.log("add media");
        props.navigation.navigate('NotesMedia');
    }

    const handleDeleteConfirm = () => {
        console.log("confirm delete Schdule");
        //props.navigation.navigate('TripDetail');
    }

    return (
        <PaperProvider>
            <View>
                <CustomHeader title={"Japan Gogo"}>
                    <IconButton onPress={handleEdit} icon={"edit"} />
                </CustomHeader>
                <ScrollView>
                    <View style={[styles.container, g_STYLE.col]}>
                        <View>
                            <View style={g_STYLE.row}>
                                <View style={[g_STYLE.col, styles.leftContainer]}>
                                    <CustomText size={25}>Dotombori District</CustomText>
                                    <CustomText>Sushiro</CustomText>
                                    <CustomText>20/12/2023 10:00 - 12:00 (2hrs)</CustomText>
                                </View>
                                <View style={styles.rightContainer}>
                                    <CircularImage size={screenWidth * 0.15} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                                    {/*<Image source={{ uri: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} style={styles.image} />*/}
                                    <RoundButton icon={getActivityIcon(ActivityTypes.FOOD)} title="Food"></RoundButton>
                                </View>
                            </View>
                            <View style={styles.description}>
                                <CustomText>
                                    Remember to eat salmon!!!!!{'\n'}
                                    Remember to eat ice cream!!!!!{'\n'}
                                    Remember to eat tamagoyaki!!!!!{'\n'}
                                    Remember to eat wagyu!!!!!{'\n'}
                                    Remember to eat cake!!!!!
                                </CustomText>
                            </View>
                            <View style={[styles.buttonContainer, g_STYLE.row]}>
                                <GradientButton title={"Navigate Now"} onPress={handleNavigation} width={0.43} size={20}></GradientButton>
                                <GradientButton title={"Set Reminder"} onPress={handleReminder} width={0.43} size={20}></GradientButton>
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
                                        return <RoundRectImage type={MediaTypes.OTHER} onPress={handleAddMedia}></RoundRectImage>
                                    } else {
                                        return <RoundRectImage type={MediaTypes.VIDEO} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}></RoundRectImage>
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
                                <GradientButton size={20} title={"Add Schedule"} radius={35} onPress={function (): void {
                                    throw new Error("Function not implemented.");
                                }} />
                            </View>}
                        <CustomText size={20}>Partners</CustomText>
                        <FlatList
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() =>
                                <View style={{ height: 5 }}></View>
                            }
                            data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                            renderItem={({ item, index }) => (
                                <ImageTile title={"Samoyed Meme"} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}></ImageTile>
                            )}>
                        </FlatList>
                        <View style={styles.deleteButton}>
                            <GradientPopupDialog isSelect={true} title="Reminder" onPress={handleDeleteConfirm}>
                                {[
                                    <View style={g_STYLE.row}>
                                        <MaterialIcons name={"delete-outline"} color={g_THEME.colors.error} size={25} ></MaterialIcons>
                                        <CustomText color={g_THEME.colors.error} size={22}>Delete</CustomText>
                                    </View>,
                                    <CustomText size={20}>Are you sure to delete this schedule? Everyone will not be able to access the trip again</CustomText>
                                ]}
                            </GradientPopupDialog>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    space: {
        height: 10,
    },
    lowerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    deleteButton: {
        marginTop: 40,
        marginBottom: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ScheduleScreen;