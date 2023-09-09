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
import { TripPartner } from "../../models/trip_partner";
import { useDispatch, useSelector } from "react-redux";
import { addSchedules, fetchSchedule, fetchScheduleAccesses, fetchScheduleTypes, updateSchedule } from "../../actions/schedule_actions";
import { DispatchThunk } from "../../store/store";
import IconButton from "../../components/atoms/icon_button";
import { User } from "../../models/user";
import { scheduleSelector } from "../../slices/schedule_slice";
"../../utils/datetime_formatter";

const ScheduleEditScreen: React.FC<RootProps<'ScheduleEdit'>> = (props) => {
    const { schedule_id, trip_id } = props.route.params;
    const [users, setUsers] = useState<User[] | null>([]);
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
    const { schedule, types } = useSelector(scheduleSelector);
    const rUsers = useSelector(scheduleSelector).users;

    useEffect(() => {
        dispatch(fetchScheduleTypes());
        if (schedule_id != null) {
            dispatch(fetchScheduleAccesses(schedule_id));
            dispatch(fetchSchedule(schedule_id));
        }
        return () => {
        };
    }, []);

    useEffect(() => {
        if (schedule_id != null) {
            setName(schedule?.schedule_name ?? '');
            setPlace(schedule?.schedule_place ?? '');
            setType(schedule?.schedule_type!);
            setDate(schedule?.schedule_datetime ? new Date(schedule.schedule_datetime) : new Date());
            setStartTime(schedule?.schedule_datetime ? new Date(schedule?.schedule_datetime) : new Date());
            setRemarks(schedule?.schedule_remark ?? '');
        }
    }, [schedule]);

    useEffect(() => {
        setUsers(rUsers.filter((item) => item.is_active));
    }, [rUsers]);

    useEffect(() => {
        setScheduleType(types);
    }, [types]);

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
                            <View style={{ padding: 0, margin: 0 }}>
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
        if (schedule_id) {
            props.navigation.navigate('ScheduleAccess', { schedule_id: schedule_id });
        }
    }

    // const handleScheduleAccess = (value: ScheduleAccess) => {
    //     const updated: ScheduleAccess[] = scheduleAccess?.filter((item) => item.user_id != value.user_id)!;
    //     setScheduleAccess(updated);
    // }

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
        if (type == null) {
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
                    {schedule_id && <><View style={[styles.partnerContainer, g_STYLE.row]}>
                        <CustomText size={25}>Accessible Partners</CustomText>
                        <IconButton onPress={handlePartner} icon={"person-add"}></IconButton>
                    </View>
                        <FlatList
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() =>
                                <View style={{ height: 5 }}></View>
                            }
                            data={users}
                            renderItem={({ item, index }) => (
                                <PartnerTile
                                    name={item.name ?? ''}
                                    uri={item.user_icon_url}
                                    noSuffix
                                    isPending={false}></PartnerTile>
                            )}>
                        </FlatList></>}
                    <View style={styles.saveButton}>
                        <GradientButton title={schedule_id ? "Save" : "Continue"} onPress={handleSave}></GradientButton>
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
