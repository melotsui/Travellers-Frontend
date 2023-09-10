import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import SeparateLine from "../../components/atoms/separate_line";
import CircularImage from "../../components/atoms/circular_image";
import GradientButton from "../../components/molecules/gradient_button";
import g_THEME from "../../theme/theme";
import ScheduleTile from "../../components/organisms/schedule_tile";
import { ActivityTypes } from "../../constants/types";
import CustomHeader from "../../components/molecules/header";
import { PaperProvider } from "react-native-paper";
import GradientPopupMenu from "../../components/molecules/gradient_menu";
import CustomMenuItem from "../../components/atoms/custom_menu_item";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { formatDate, formatTime, getDateFromString } from "../../utils/datetime_formatter";
import { Trip } from "../../models/trip";
import { useDispatch, useSelector } from "react-redux";
import { tripSelector } from "../../slices/trip_slice";
import { DispatchThunk } from "../../store/store";
import { deleteTrip, fetchTrip, fetchTripPartner, leaveTrip } from "../../actions/trip_actions";
import { fetchSchedules } from "../../actions/schedule_actions";
import { scheduleSelector } from "../../slices/schedule_slice";

const TripDetailScreen: React.FC<RootProps<'TripDetail'>> = (props) => {
    const { trip_id } = props.route.params;
    const dispatch: DispatchThunk = useDispatch();
    const { trip, error } = useSelector(tripSelector);
    const { schedules } = useSelector(scheduleSelector);
    const [isDialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchTrip(trip_id));
        dispatch(fetchSchedules(trip_id));
        dispatch(fetchTripPartner(trip_id));
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
        props.navigation.navigate('ScheduleEdit', { schedule_id: null, trip_id: trip_id });
    }
    const handleMap = () => {
        console.log("map trip");
        //props.navigation.navigate('TripDetail');
    }
    const handleShare = () => {
        console.log("share trip");
        //props.navigation.navigate('TripDetail');
    }
    const handleLeave = async () => {
        dispatch(leaveTrip(trip_id));
    }

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    useEffect(() => {
        if(error){
            showDialog();
        }
    }, [error]);

    const handleDelete = async () => {
        dispatch(deleteTrip(trip_id));
    }
    const handleAddMedia = () => {
        console.log("add media");
    }
    const handleScheduleTileChange = (schedule_id: number) => {
        props.navigation.navigate('Schedule', { schedule_id: schedule_id });
    }

    return (
        <PaperProvider>
            {trip && <><CustomHeader title={trip!.trip_name}>
                {/* <IconButton onPress={handleNote} icon={"description"} /> */}
                <View style={{ width: 10 }}></View>
                <GradientPopupMenu>
                    <CustomMenuItem title={"Edit"} onPress={handleEdit} icon={"edit"} />
                    <CustomMenuItem title={"Add Schedule"} onPress={handleAddSchedule} icon={"edit-calendar"} />
                    <CustomMenuItem title={"Map"} onPress={handleMap} icon={"pin-drop"} />
                    <CustomMenuItem title={"Share"} onPress={handleShare} icon={"share"} />
                    <GradientPopupDialog isSelect={true} title="Reminder" onPress={handleLeave}>
                        {[
                            <CustomMenuItem title={"Leave Trip"} icon={"delete-outline"} key={0}/>,
                            <CustomText size={20} key={1}>Are you sure to leave this schedule?</CustomText>
                        ]}
                    </GradientPopupDialog>
                    <GradientPopupDialog isSelect={true} title="Reminder" onPress={handleDelete} outVisible={isDialogVisible} onDismiss={hideDialog}>
                        {[
                            ,
                            <CustomText size={20} key={1}>{error}</CustomText>
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
                            </View>
                        </View>
                        <View style={styles.description}>
                            <CustomText>{trip!.trip_description}</CustomText>
                        </View>
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
                                type={ActivityTypes.DINING}
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
        height: screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TripDetailScreen;