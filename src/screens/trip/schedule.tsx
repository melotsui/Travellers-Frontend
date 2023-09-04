import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenWidth } from "../../constants/screen_dimension";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import SeparateLine from "../../components/atoms/separate_line";
import CircularImage from "../../components/atoms/circular_image";
import GradientButton from "../../components/molecules/gradient_button";
import g_THEME from "../../theme/theme";
import RoundRectImage from "../../components/atoms/round_rect_image";
import { ActivityTypes, MediaTypes } from "../../constants/types";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import { PaperProvider } from "react-native-paper";
import RoundButton from "../../components/atoms/round_button";
import ImageTile from "../../components/molecules/image_tile";
import getActivityIcon from "../../helpers/activity_icon";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { formatDate } from "../../utils/datetime_formatter";

const ScheduleScreen: React.FC<RootProps<'Schedule'>> = (props) => {
    const { schedule_id } = props.route.params;
    const [schedule, setSchedule] = useState<Schedule | null>(null);

    useEffect(() => {

        const fetchSchedule = async () => {
            await apis.schedule.getScheduleById(schedule_id)
                .then((response) => {
                    console.log('success to get schedule');
                    setSchedule(response);
                })
                .catch((error) => {
                    console.log('failed to get schedule');
                });
        }
        fetchSchedule();
        return () => {
            // Perform any cleanup tasks here if necessary
        };
    }, []);

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
            { schedule && <View>
                <CustomHeader title={schedule?.schedule_name}>
                    <IconButton onPress={handleEdit} icon={"edit"} />
                </CustomHeader>
                <ScrollView>
                    <View style={[styles.container, g_STYLE.col]}>
                        <View>
                            <View style={g_STYLE.row}>
                                <View style={[g_STYLE.col, styles.leftContainer]}>
                                    <CustomText size={25}>{schedule?.schedule_place}</CustomText>
                                    <CustomText>Sushiro</CustomText>
                                    <CustomText>{formatDate(new Date(schedule?.schedule_datetime!))} 10:00 - 12:00 (2hrs)</CustomText>
                                </View>
                                <View style={styles.rightContainer}>
                                    <CircularImage size={screenWidth * 0.15} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                                    {/*<Image source={{ uri: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} style={styles.image} />*/}
                                    <RoundButton icon={getActivityIcon(ActivityTypes.FOOD)} title="Food"></RoundButton>
                                </View>
                            </View>
                            <View style={styles.description}>
                                <CustomText>{schedule?.schedule_remark}</CustomText>
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
            </View>}
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