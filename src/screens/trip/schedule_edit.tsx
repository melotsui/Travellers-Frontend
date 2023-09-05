import React, { ReactNode, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import TextField from "../../components/molecules/text_field";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatDate, formatTime, parseDate, parseTime } from "../../utils/datetime_formatter";
import PartnerTile from "../../components/organisms/partner_tile";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { MediaModal } from "../../models/media";
import { ActivityTypes } from "../../constants/types";
import { PaperProvider } from "react-native-paper";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import SeparateLine from "../../components/atoms/separate_line";
import BottomSheetTile from "../../components/organisms/bottom_sheet_tile";
import g_THEME from "../../theme/theme";
"../../utils/datetime_formatter";

const ScheduleEditScreen: React.FC<RootProps<'ScheduleEdit'>> = (props) => {
    const { schedule_id } = props.route.params;
    const [scheduleAccess, setScheduleAccess] = useState<ScheduleAccess[] | null>([]);
    //const [tripAccess, setTripAccess] = useState<TripAccess[] | null>([]);
    const [scheduleType, setScheduleType] = useState<ScheduleType[] | null>([]);
    const { showBottomSheet, setBottomSheetContent } = useBottomSheet();
    const [name, setName] = useState('Japan Gogo');
    const [place, setPlace] = useState('Japan');
    const [type, setType] = useState<ScheduleType | null>(null);
    const [date, setDate] = useState<Date>(parseDate('12/20/2023'));
    const [startTime, setStartTime] = useState(parseTime('10:00'));
    const [endTime, setEndTime] = useState(parseTime('12:00'));
    const [remarks, setRemarks] = useState('');
    const [partner, setPartner] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const promise1: Promise<Schedule> = apis.schedule.getScheduleById(schedule_id)
                const promise2: Promise<ScheduleAccess[]> = apis.schedule.getScheduleAccess(schedule_id)
                const promise3: Promise<ScheduleType[]> = apis.schedule.getScheduleTypeList()
                const [schedule, scheduleAccess, scheduleType] = await Promise.all([promise1, promise2, promise3]);

                setScheduleAccess(scheduleAccess);
                setScheduleType(scheduleType);
                setName(schedule.schedule_name);
                setPlace(schedule.schedule_place ?? '');
                setType(null);
                setDate(parseDate(formatDate(new Date(schedule!.schedule_datetime!))));
                setStartTime(parseTime(formatTime(new Date(schedule!.schedule_datetime!))));
                setEndTime(parseTime(formatTime(new Date(schedule!.schedule_datetime!))));
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

    const content = (): ReactNode => {
        return <>
            <View style={{ height: 300 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.schedule_type_id.toString()}
                    data={scheduleType}
                    renderItem={({ item, index }) => (
                        <>
                            <BottomSheetTile onPress={() => { setType(item) }}>{item.schedule_type}</BottomSheetTile>
                            { scheduleType!.length - 1 != index && <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>}
                        </>
                    )}>
                </FlatList></View>
        </>
    }

    const handleName = (value: string) => {
        setName(value);
    }

    const handlePlace = (value: string) => {
        setPlace(value);
    }

    const handleType = () => {
        console.log(scheduleType);
        setBottomSheetContent(content());
        showBottomSheet();
    }

    const handleDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowDatePicker(false);
        if (date != null) {
            setDate(parseDate(date.toLocaleDateString()));
        }
    }

    const handleStartTime = (event: DateTimePickerEvent, date?: Date) => {
        setShowStartTimePicker(false);
        if (date != null) {
            setStartTime(parseTime(date.toTimeString()));
        }
    };

    const handleEndTime = (event: DateTimePickerEvent, date?: Date) => {
        setShowEndTimePicker(false);
        if (date != null) {
            setEndTime(parseTime(date.toTimeString()));
        }
    };

    const handleRemarks = (value: string) => {
        setRemarks(value);
    }

    const handlePartner = (value: string) => {
        setPartner(value);
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

    const handleEndTimePicker = () => {
        setShowEndTimePicker(true);
    }

    const handleSave = async () => {
        await apis.schedule.updateSchedule(schedule_id, name, type?.schedule_type_id ?? undefined, startTime, endTime, place, remarks)
            .then((response) => {
                console.log('success to update schedule');
            })
            .catch((error) => {
                console.log('failed to update schedule');
            });
    }

    return (
        <View>
            <CustomHeader title={name ?? 'Schedule'}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <CustomText size={25}>Trip Name</CustomText>
                    <TextField text={name} onChange={handleName}></TextField>

                    <CustomText size={25}>Place</CustomText>
                    <TextField text={place} onChange={handlePlace}></TextField>

                    <CustomText size={25}>Type</CustomText>
                    <TextField text={type?.schedule_type ?? 'Please select'} onPressText={handleType}></TextField>

                    <CustomText size={25}>Date</CustomText>
                    <View style={[styles.datetimeContainer, g_STYLE.row]}>
                        <View style={styles.date}>
                            <TextField text={formatDate(date)} onPressText={handleDatePicker} />
                        </View>
                        {showDatePicker && <RNDateTimePicker
                            mode="date"
                            value={date}
                            onChange={handleDate}
                            minimumDate={new Date()}
                        />}
                        {/*<IconButton onPress={handleSelectDate} icon={"event"}></IconButton>*/}
                    </View>

                    <CustomText size={25}>Time</CustomText>
                    <View style={[styles.datetimeContainer, g_STYLE.row]}>
                        <View style={styles.time}>
                            <TextField text={formatTime(startTime)} onPressText={handleStartTimePicker} />
                        </View>
                        {showStartTimePicker && <RNDateTimePicker
                            mode="time"
                            value={startTime}
                            onChange={handleStartTime}
                        />}
                        <View style={styles.to}>
                            <CustomText size={25}>to</CustomText>
                        </View>
                        <View style={styles.time}>
                            <TextField text={formatTime(endTime)} onPressText={handleEndTimePicker} />
                        </View>
                        {showEndTimePicker && <RNDateTimePicker
                            mode="time"
                            value={endTime}
                            onChange={handleEndTime}
                        />}
                        {/*<IconButton onPress={handleSelectTime} icon={"schedule"}></IconButton>*/}

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
    },
    date: {
        width: '40%',
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