import React, { useEffect, useState } from "react";
import { View, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import g_THEME from "../../theme/theme";
import CustomHeader from "../../components/molecules/header";
import { PaperProvider } from "react-native-paper";
import { RootProps } from "../../navigation/screen_navigation_props";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import { screenWidth } from "../../constants/screen_dimension";
import GradientButton from "../../components/molecules/gradient_button";
import { FlatList } from "react-native-gesture-handler";
import Container from "../../components/atoms/container";
import GradientContainer from "../../components/atoms/gradient_container";
import apis from "../../api/api_service";
import { formatDatetime, formatTime } from "../../utils/datetime_formatter";

const ScheduleReminderScreen: React.FC<RootProps<'ScheduleReminder'>> = (props) => {
    const { schedule_id, schedule_datetime } = props.route.params;
    const [scheduleReminderId, setScheduleReminderId] = useState(0);
    const [time, setTime] = useState('');
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // Your data for FlatList
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {
        console.log(schedule_datetime);
        const fetchData = async () => {
            await apis.schedule.getScheduleReminders(schedule_id)
                .then((res) => {
                    console.log("getScheduleReminders");
                    console.log(res);
                    setTime(formatTime(new Date(res.schedule_reminder_datetime)));
                    setScheduleReminderId(res.schedule_reminder_id);
                }).catch((err) => {
                    console.log(err);
                });
        };
        fetchData();
        return () => {
            // cleanup
        }
    }, []);

    const ITEM_HEIGHT = 22.5; // Adjust as needed

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.floor(contentOffset.y / ITEM_HEIGHT);
        const value = data[index];
        setScrollValue(value);
    };

    const handleSave = async () => {
        const time = new Date(schedule_datetime);
        time.setMinutes(time.getMinutes() - scrollValue);
        if (scheduleReminderId == 0) {
            await apis.schedule.addScheduleReminders(schedule_id, formatDatetime(time)!)
                .then((res) => {
                    setScheduleReminderId(res.schedule_reminder_id);
                    setTime(formatTime(new Date(res.schedule_reminder_datetime)));

                }).catch((err) => {
                    console.log(err);
                });
        } else {
            await apis.schedule.updateScheduleReminders(scheduleReminderId, formatDatetime(time)!)
                .then((res) => {
                    setScheduleReminderId(res.schedule_reminder_id);
                    setTime(formatTime(new Date(res.schedule_reminder_datetime)));

                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleDelete = async () => {
        await apis.schedule.deleteScheduleReminders(scheduleReminderId)
            .then((res) => {
                console.log(res);
                setTime('');
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <PaperProvider>
            <View>
                <CustomHeader title={"Schedule Reminder"}>
                </CustomHeader>
                <View style={[styles.container, g_STYLE.col]}>
                    <CustomText size={24} color={g_THEME.colors.secondary} textAlign="center">You have set a alarm on {time}</CustomText>
                    <View style={styles.text}>
                        <CustomText size={18} textAlign="center"> Set a reminder {"\n"} to get tight of the schedule! </CustomText>
                    </View>

                    <CustomText size={25}>Before schedule</CustomText>
                    <View style={{ height: 15 }}></View>
                    <Container>
                        <GradientContainer>
                            <View style={[g_STYLE.row, styles.timeSelect]}>
                                <FlatList
                                    data={['', ...data, '']}
                                    keyExtractor={(item, index) => index.toString()}
                                    onScroll={handleScroll}
                                    scrollEventThrottle={16} // Adjust as needed
                                    initialScrollIndex={1}
                                    getItemLayout={(_, index) => ({
                                        length: ITEM_HEIGHT,
                                        offset: ITEM_HEIGHT * index,
                                        index,
                                    })}
                                    renderItem={({ item }) => <CustomText size={scrollValue == item ? 30 : 20} color={scrollValue == item ? 'white' : g_THEME.colors.shadowBlue} textAlign="center" >{item}</CustomText>}
                                />
                                <View style={{ width: 20 }}></View>
                                <CustomText color={'white'} size={25}>mins</CustomText>
                            </View>
                        </GradientContainer>
                    </Container>

                    <View style={styles.saveButton}>
                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                        <GradientButton title={"Delete"} onPress={handleDelete} color={g_THEME.colors.error}></GradientButton>
                    </View>
                </View>
            </View>
        </PaperProvider >
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    timeSelect: {
        height: 100,
        width: screenWidth * 0.4,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        width: screenWidth * 0.9,
        margin: 40,
    },
    saveButton: {
        alignItems: 'center',
        marginVertical: 60,
    }
});

export default ScheduleReminderScreen;