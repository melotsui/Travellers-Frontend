import React, { ReactNode, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import TextField from "../../components/molecules/text_field";
import { formatDate, formatDatetime, formatTime } from "../../utils/datetime_formatter";
import PartnerTile from "../../components/organisms/partner_tile";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import SeparateLine from "../../components/atoms/separate_line";
import BottomSheetTile from "../../components/organisms/bottom_sheet_tile";
import g_THEME from "../../theme/theme";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { ScheduleAccess } from "../../models/schedule_access";
import { TripPartner } from "../../models/trip_partner";
import { useDispatch } from "react-redux";
import { addSchedules, updateSchedule } from "../../actions/schedule_actions";
import { DispatchThunk } from "../../store/store";
import { TripTripPartnerUser } from "../../models/trip_trip_partner_user";
import { TripPartnerInvitation } from "../../models/trip_partner_invitation";
"../../utils/datetime_formatter";

const ScheduleEditScreen: React.FC<RootProps<'ScheduleEdit'>> = (props) => {
    const { schedule_id, trip_id } = props.route.params;
    const [scheduleAccess, setScheduleAccess] = useState<ScheduleAccess[] | null>([]);
    //const [tripAccess, setTripAccess] = useState<TripAccess[] | null>([]);
    const [scheduleType, setScheduleType] = useState<ScheduleType[] | null>([]);
    const { showBottomSheet, setBottomSheetContent, hideBottomSheet } = useBottomSheet();
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [type, setType] = useState<ScheduleType | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date('0000-00-00T00:00:00'));
    const [remarks, setRemarks] = useState('');
    const [nameError, setNameError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [partner, setPartner] = useState<TripPartner | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {

        const fetchData = async () => {

            try {
                const promise1: Promise<ScheduleType[]> = apis.schedule.getScheduleTypeList()
                const promise2: Promise<TripPartnerInvitation> = apis.trip.getTripPartners(trip_id)
                const [scheduleTypes, tripPartners] = await Promise.all([promise1, promise2]);
                        setScheduleType(scheduleTypes);

                if (schedule_id == null) return;
                const promise3: Promise<Schedule> = apis.schedule.getScheduleById(schedule_id)
                const promise4: Promise<ScheduleAccess[]> = apis.schedule.getScheduleAccess(schedule_id)
                const [schedule, scheduleAccess] = await Promise.all([promise3, promise4]);

                setScheduleAccess(scheduleAccess);
                setName(schedule.schedule_name);
                setPlace(schedule.schedule_place ?? '');
                setType(schedule.schedule_type!);
                setDate(new Date(schedule!.schedule_datetime!));
                setStartTime(new Date(schedule!.schedule_datetime!));
                setRemarks(schedule.schedule_remark ?? '');


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

    const handleTypeOnPress = (item: ScheduleType) => {
        setType(item);
        hideBottomSheet();
    }

    const content = (): ReactNode => {
        return <>
            <View style={{ height: 300, width: '100%' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.schedule_type_id.toString()}
                    data={scheduleType}
                    renderItem={({ item, index }) => (
                        <>
                            <View style={{padding: 0, margin: 0}}>
                                <BottomSheetTile onPress={() => { handleTypeOnPress(item) }}>{item.schedule_type}</BottomSheetTile>
                                {scheduleType!.length - 1 != index && <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>}
                            </View>
                        </>
                    )}>
                </FlatList></View>
        </>
    }

    const handleName = (value: string) => {
        setNameError('');
        setName(value);
    }

    const handlePlace = (value: string) => {
        setPlace(value);
    }

    const handleType = () => {
        setTypeError('');
        setBottomSheetContent(content());
        showBottomSheet();
    }

    const handleDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowDatePicker(false);
        if (date != null) {
            setDate(date);
            console.log(date);
        }
    }

    const handleStartTime = (event: DateTimePickerEvent, date?: Date) => {
        setShowStartTimePicker(false);
        if (date != null) {
            setStartTime(date);
        }
    };

    const handleRemarks = (value: string) => {
        setRemarks(value);
    }

    const handlePartner = () => {
        setPartner(null);
    }

    const handleScheduleAccess = (value: ScheduleAccess) => {
        const updated: ScheduleAccess[] = scheduleAccess?.filter((item) => item.user_id != value.user_id)!;
        setScheduleAccess(updated);
    }

    const handleDatePicker = () => {
        setShowDatePicker(true);
    }

    const handleStartTimePicker = () => {
        setShowStartTimePicker(true);
    }

    const handleSave = async () => {
        if (name == '') {
            setNameError('Schedule name cannot be empty');
            return;
        }
        if(type == null) {
            setTypeError('Schedule type cannot be empty');
            return;
        }
        const datetime = new Date(formatDatetime(undefined, date, startTime)!);
        if (schedule_id) {
            dispatch(updateSchedule(schedule_id, name, type?.schedule_type_id ?? undefined, datetime, place, remarks));
            // await apis.schedule.updateSchedule(schedule_id, name, type?.schedule_type_id ?? undefined, datetime, place, remarks)
            //     .then((response) => {
            //         console.log('success to update schedule');
            //         apis.schedule.setScheduleAccess(schedule_id, null);
            //         props.navigation.goBack();
            //     })
            //     .catch((error) => {
            //         console.log('failed to update schedule');
            //     });
        } else {
            
            dispatch(addSchedules(trip_id, name, type?.schedule_type_id ?? undefined, datetime, place, remarks));
            // await apis.schedule.createSchedule(trip_id, name, type?.schedule_type_id ?? undefined, datetime, place, remarks)
            //     .then((response) => {
            //         console.log('success to create schedule', response);
            //         apis.schedule.setScheduleAccess(response?.schedule_id!, null);
            //         props.navigation.goBack();
            //     })
            //     .catch((error) => {
            //         console.log('failed to create schedule', error);
            //     });
        }
    }

    return (
        <View>
            <CustomHeader title={schedule_id == null ? "Add Schedule" : "Edit Schedule"}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <CustomText size={25}>Schedule Name</CustomText>
                    <TextField text={name} error={nameError} onChange={handleName}></TextField>

                    <CustomText size={25}>Place</CustomText>
                    <TextField text={place} onChange={handlePlace}></TextField>

                    <CustomText size={25}>Type</CustomText>
                    <TextField text={type?.schedule_type ?? 'Please select'} error={typeError} onPressText={handleType}></TextField>

                    <View style={[styles.datetimeContainer, g_STYLE.row]}>
                        <View style={[styles.date, g_STYLE.col]}>
                            <CustomText size={25}>Date</CustomText>
                            <TextField text={formatDate(date)} onPressText={handleDatePicker} />
                        </View>
                        {showDatePicker && <RNDateTimePicker
                            mode="date"
                            value={date}
                            onChange={handleDate}
                            minimumDate={new Date()}
                        />}
                        <View style={[styles.date, g_STYLE.col]}>
                            <CustomText size={25}>Date</CustomText>
                            <TextField text={formatTime(startTime)} onPressText={handleStartTimePicker} />
                            {showStartTimePicker && <RNDateTimePicker
                                mode="time"
                                value={startTime}
                                onChange={handleStartTime}
                            />}
                        </View>
                    </View>

                    <CustomText size={25}>Remarks</CustomText>
                    <TextField text={remarks} onChange={handleRemarks} numberOfLines={4}></TextField>
                    <CustomText size={25}>Accessible Partners</CustomText>
                    {/*<View style={[styles.partnerContainer, g_STYLE.row]}>
                        <View style={styles.partner}>
                            <TextField text={partner} onChange={handlePartner} hint="Send Invitation"></TextField>
                        </View>
                        <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
                        </View>*/}
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View style={{ height: 5 }}></View>
                        }
                        data={scheduleAccess}
                        renderItem={({ item, index }) => (
                            <PartnerTile
                                name={"Samoyed Meme"}
                                uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'}
                                onPress={() => handleScheduleAccess(item)}
                                isPending={false}
                                isAdded={true}></PartnerTile>
                        )}>
                    </FlatList>
                    <View style={styles.saveButton}>
                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    datetimeContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    date: {
        width: '45%',
        marginRight: 10,
    },
    time: {
        marginRight: 10,
        width: '26%',
    },
    to: {
        marginRight: 10,
    },
    partnerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    partner: {
        width: '90%'
    },
    saveButton: {
        alignItems: 'center',
        marginVertical: 60,
    }
});


export default ScheduleEditScreen;
