import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HomeProps } from "../../navigation/stack_navigations/trip_stack_navigation";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import g_THEME from "../../theme/theme";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import ImageTile from "../../components/molecules/image_tile";
import TextField from "../../components/molecules/text_field";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatDate, parseDate } from "../../utils/datetime_formatter";

const TripEditScreen: React.FC<HomeProps<'TripEdit'>> = (props) => {
    const [name, setName] = useState('Japan Gogo');
    const [startDate, setStartDate] = useState(parseDate('12/20/2023'));
    const [endDate, setEndDate] = useState(parseDate('12/25/2023'));
    const [description, setDescription] = useState('');
    const [partner, setPartner] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleName = (value: string) => {
        setName(value);
    }

    const handleStartDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowStartDatePicker(false);
        if (date != null) {
            setStartDate(parseDate(date.toLocaleDateString()));
        }
    }

    const handleEndDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowEndDatePicker(false);
        if (date != null) {
            setEndDate(parseDate(date.toLocaleDateString()));
        }
    }

    const handleDescription = (value: string) => {
        setDescription(value);
    }

    const handlePartner = (value: string) => {
        setPartner(value);
    }

    const handleSelectDate = () => {
    }

    const handleStartDatePicker = () => {
        setShowStartDatePicker(true);
    }

    const handleEndDatePicker = () => {
        setShowEndDatePicker(true);
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
                    <View style={[styles.dateContainer, g_STYLE.row]}>
                        <View style={styles.date}>
                            <TextField text={formatDate(startDate)} onPressText={handleStartDatePicker}/>
                        </View>
                        {showStartDatePicker && <RNDateTimePicker
                            mode="date"
                            value={startDate}
                            onChange={handleStartDate}
                            minimumDate={new Date()}
                        />}
                        <CustomText size={25}>to</CustomText>
                        <View style={styles.date}>
                            <TextField text={formatDate(endDate)} onPressText={handleEndDatePicker}/>
                        </View>
                        {showEndDatePicker && <RNDateTimePicker
                            mode="date"
                            value={endDate}
                            onChange={handleEndDate}
                            minimumDate={new Date()}
                        />}
                        {/*<IconButton onPress={handleSelectDate} icon={"event"}></IconButton>*/}
                    </View>
                    <CustomText size={25}>Description</CustomText>
                    <TextField text={description} onChange={handleDescription} numberOfLines={4}></TextField>
                    <CustomText size={25}>Partners</CustomText>
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
    dateContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        width: '43%',
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

export default TripEditScreen;