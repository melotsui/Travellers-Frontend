import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import TextField from "../../components/molecules/text_field";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatDate, parseDate } from "../../utils/datetime_formatter";
import PartnerTile from "../../components/organisms/partner_tile";
import { RootProps } from "../../navigation/screen_navigation_props";

const TripEditScreen: React.FC<RootProps<'TripEdit'>> | React.FC = (props: any) => {
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

    const handleSave = () => {
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
                            <PartnerTile 
                            name={"Samoyed Meme"} 
                            uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} 
                            onPress={handleInvitePartner} 
                            isPending={false}></PartnerTile>
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