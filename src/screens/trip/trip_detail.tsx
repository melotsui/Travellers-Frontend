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
import ScheduleTile from "../../components/organisms/schedule_tile";
import { ActivityTypes, MediaTypes } from "../../constants/types";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import { PaperProvider } from "react-native-paper";
import GradientPopupMenu from "../../components/molecules/gradient_menu";
import CustomMenuItem from "../../components/atoms/custom_menu_item";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { formatDate, formatTime, getDateFromString, getTimeFromString } from "../../utils/datetime_formatter";

const TripDetailScreen: React.FC<RootProps<'TripDetail'>> = (props) => {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [schedules, setSchedules] = useState<Schedule[] | null>([]);
    const { trip_id } = props.route.params;

    useEffect(() => {

        const fetchData = async () => {

            try {
                const promise1: Promise<Trip> = apis.trip.getTripById(trip_id);
                const promise2: Promise<Schedule[]> = apis.schedule.getScheduleListById(trip_id);

                const [trip, schedule] = await Promise.all([promise1, promise2]);

                setTrip(trip);
                setSchedules(schedule);

            } catch (error) {
                // Handle any errors that occurred during the API calls
                console.error('Error:', error);
            }
        }
        fetchData();
        return () => {
            // Perform any cleanup tasks here if necessary
        };
    }, []);

    const handleNote = () => {
        props.navigation.navigate('Notes');
    }
    const handleEdit = () => {
        props.navigation.navigate('TripEdit', { trip_id: trip_id });
    }
    const handleAddSchedule = () => {
        console.log("add schdule");
        //props.navigation.navigate('TripDetail');
    }
    const handleMap = () => {
        console.log("map trip");
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
    const handleAddMedia = () => {
        console.log("add media");
        props.navigation.navigate('NotesMedia');
    }
    const handleScheduleTileChange = (schedule_id: number) => {
        props.navigation.navigate('Schedule', { schedule_id: schedule_id });
    }

    return (
        <PaperProvider>
            {trip && <><CustomHeader title={trip!.trip_name}>
                <IconButton onPress={handleNote} icon={"description"} />
                <View style={{ width: 10 }}></View>
                <GradientPopupMenu>
                    <CustomMenuItem title={"Edit"} onPress={handleEdit} icon={"edit"} />
                    <CustomMenuItem title={"Add Schedule"} onPress={handleAddSchedule} icon={"edit-calendar"} />
                    <CustomMenuItem title={"Map"} onPress={handleMap} icon={"pin-drop"} />
                    <CustomMenuItem title={"Share"} onPress={handleShare} icon={"share"} />

                    <GradientPopupDialog isSelect={true} title="Reminder" onPress={handleDelete}>
                        {[
                            <CustomMenuItem title={"Delete"} onPress={handleDelete} icon={"delete-outline"} key={0}/>,
                            <CustomText size={20} key={1}>Are you sure to delete this schedule? Everyone will not be able to access the trip again</CustomText>
                        ]}
                    </GradientPopupDialog>
                </GradientPopupMenu>
            </CustomHeader> 
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <View>
                        <View style={g_STYLE.row}>
                            <View style={[g_STYLE.col, styles.leftContainer]}>
                                <CustomText size={25}>{trip!.trip_destination}</CustomText>
                                <CustomText>{getDateFromString(trip!.trip_datetime_from!)} - {getDateFromString(trip!.trip_datetime_to!)}</CustomText>
                            </View>
                            <View style={styles.rightContainer}>
                                <CircularImage size={screenWidth * 0.15} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                                {/*<Image source={{ uri: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} style={styles.image} />*/}
                            </View>
                        </View>
                        <View style={styles.description}>
                            <CustomText>{trip!.trip_description}</CustomText>
                        </View>
                        {/*<FlatList
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
                                    return <RoundRectImage type={MediaTypes.IMAGE} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}></RoundRectImage>
                                }
                            }}
                        ></FlatList>*?*/}
                    </View>
                    <View style={styles.space}></View>
                    <SeparateLine isTextInclude={false} />
                    <View style={styles.space}></View>
                    {schedules!.length == 0 &&
                        <View style={styles.lowerContainer}>
                            <CustomText size={25} textAlign={'center'}>Your Trip is empty{'\n'}Let's add schedule !!</CustomText>
                            <View style={styles.space}></View>
                            <GradientButton size={20} title={"Add Schedule"} radius={35} onPress={handleAddSchedule} />
                        </View>}

                    {schedules && <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View style={{ height: 5 }}></View>
                        }
                        keyExtractor={(schedule: Schedule) => schedule.schedule_id.toString()}
                        data={schedules}
                        renderItem={({ item, index }) => {
                            let transportTime = undefined;
                            if(index != schedules.length -1){
                                transportTime = "15 mins"
                            }
                            return <ScheduleTile
                                step={index}
                                title={item.schedule_name}
                                subTitle={item.schedule_place!}
                                date={formatDate(new Date(item.schedule_datetime!))}
                                time={formatTime(new Date(item.schedule_datetime!))}
                                type={ActivityTypes.FOOD}
                                transportTime={transportTime}
                                onPress={() => handleScheduleTileChange(item.schedule_id)}  />
                    }}>
                    </FlatList>}
                </View>
            </ScrollView></>}
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