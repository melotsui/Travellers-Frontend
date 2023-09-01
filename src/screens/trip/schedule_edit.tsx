import React, { useState } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";
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
import { PaperProvider } from "react-native-paper";
import RoundButton from "../../components/atoms/round_button";
import ImageTile from "../../components/molecules/image_tile";
import getActivityIcon from "../../helpers/activity_icon";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TextField from "../../components/molecules/text_field";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatDate, formatTime, parseDate, parseTime } from "../../utils/datetime_formatter";
"../../utils/datetime_formatter";

const ScheduleEditScreen: React.FC<HomeProps<'ScheduleEdit'>> = (props) => {
    const [name, setName] = useState('Japan Gogo');
    const [date, setDate] = useState(parseDate('12/20/2023'));
    const [startTime, setStartTime] = useState(parseTime('10:00'));
    const [endTime, setEndTime] = useState(parseTime('12:00'));
    const [remarks, setRemarks] = useState('');
    const [partner, setPartner] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const handleName = (value: string) => {
        setName(value);
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

    const handleDatePicker = () => {
        setShowDatePicker(true);
    }

    const handleStartTimePicker = () => {
        setShowStartTimePicker(true);
    }

    const handleEndTimePicker = () => {
        setShowEndTimePicker(true);
    }

    const handleInvitePartner = () => {
    }

    return (
        <View>
            <CustomHeader title={"Japan Gogo"}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <CustomText size={25}>Trip Name</CustomText>
                    <TextField text={name} onChange={handleName}></TextField>

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
                    <View style={[styles.partnerContainer, g_STYLE.row]}>
                        <View style={styles.partner}>
                            <TextField text={partner} onChange={handlePartner} hint="Send Invitation"></TextField>
                        </View>
                        <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
                    </View>
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View style={{ height: 5 }}></View>
                        }
                        data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                        renderItem={({ item, index }) => (
                            <View style={[styles.partnerContainer, g_STYLE.row]}>
                                <ImageTile title={"Samoyed Meme"} uri={'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png'}></ImageTile>
                                <RoundButton icon={"update"} title={"Pending"} color='orange'></RoundButton>
                                <IconButton onPress={handleInvitePartner} icon={"close"} color={g_THEME.colors.grey} size={20}></IconButton>
                            </View>
                        )}>
                    </FlatList>
                    <View style={styles.saveButton}>
                        <GradientButton title={"Save"} onPress={() => { }}></GradientButton>
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