import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import TextField from "../../components/molecules/text_field";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/datetime_formatter";
import PartnerTile from "../../components/organisms/partner_tile";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { shareFriend } from "../../helpers/share";
import { Trip } from "../../models/trip";
import { TripPartnerInvitation } from "../../models/trip_partner_invitation";
import { useDispatch, useSelector } from "react-redux";
import { DispatchThunk } from "../../store/store";
import { addSchedules } from "../../actions/schedule_actions";
import { addTrip, deleteTripPartner, deleteTripInvitation, fetchTrip, fetchTripPartner, updateTrip } from "../../actions/trip_actions";
import { tripSelector } from "../../slices/trip_slice";
import { PaperProvider } from "react-native-paper";

const TripEditScreen: React.FC<RootProps<'TripEdit'>> | React.FC = (props: any) => {
    const { trip_id } = props.route.params;
    const [trip, setTrip] = useState<Trip | null>(null);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [description, setDescription] = useState('');
    const [tripPartners, setTripPartners] = useState<TripPartnerInvitation | null>(null);
    const [partner, setPartner] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const rtrip = useSelector(tripSelector).trip;
    const rtripPartners = useSelector(tripSelector).tripPartners;
    const rtripInvitations = useSelector(tripSelector).tripInvitations;
    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {

        if(trip_id == null) return;
        dispatch(fetchTrip(trip_id));
        dispatch(fetchTripPartner(trip_id));
        

        // const fetchData = async () => {

        //     try {
        //         if (trip_id == null) return;
        //         const promise1: Promise<Trip> = apis.trip.getTripById(trip_id);
        //         const promise2: Promise<TripPartnerInvitation> = apis.trip.getTripPartners(trip_id);

        //         const [trip, trip_partner] = await Promise.all([promise1, promise2]);

        //         setTrip(trip);
        //         setName(trip.trip_name);
        //         setStartDate(new Date(trip!.trip_datetime_from ?? ''));
        //         setEndDate(new Date(trip!.trip_datetime_to ?? ''));
        //         setDescription(trip.trip_description ?? '');
        //         setTripPartners(trip_partner);
        //         console.log(trip_partner);

        //     } catch (error) {
        //         // Handle any errors that occurred during the API calls
        //         console.error('Error:', error);
        //     }
        // }
        // fetchData();
        return () => {
            // Perform any cleanup tasks here if necessary
        };
    }, []);

    useEffect(() => {
        if (rtrip == null) return;
        setTrip(rtrip);
        setName(rtrip.trip_name);
        setStartDate(new Date(rtrip!.trip_datetime_from ?? ''));
        setEndDate(new Date(rtrip!.trip_datetime_to ?? ''));
        setDescription(rtrip.trip_description ?? '');
    }, [rtrip]);

    useEffect(() => {
        if (rtripPartners == null) return;
        setTripPartners(new TripPartnerInvitation(rtripPartners, rtripInvitations));
    }, [rtripPartners, rtripInvitations]);

    const handleName = (value: string) => {
        setNameError('');
        setName(value);
    }

    const handleDestination = (value: string) => {
        setDestination(value);
    }

    const handleStartDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowStartDatePicker(false);
        if (date != null) {
            setStartDate(date);
        }
    }

    const handleEndDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowEndDatePicker(false);
        if (date != null) {
            setEndDate(date);
        }
    }

    const handleDescription = (value: string) => {
        setDescription(value);
    }

    const handleStartDatePicker = () => {
        setShowStartDatePicker(true);
    }

    const handleEndDatePicker = () => {
        setShowEndDatePicker(true);
    }

    const handleInvitePartner = async () => {
        props.navigation.navigate('TripInvite', { trip_id: trip_id });
    }

    const handleDeletePartner = async (trip_partner_id: number) => {
        dispatch(deleteTripPartner(trip_partner_id));
    }

    const handleDeleteTripInvitation = async (trip_invitation_id: number) => {
        dispatch(deleteTripInvitation(trip_invitation_id));
    }

    const handleSave = async () => {
        if (name == '') {
            setNameError('Name cannot be empty');
            return;
        }
        if (trip_id == null) {
            dispatch(addTrip(name, startDate, endDate, destination, description));
        } else {
            dispatch(updateTrip(trip_id, name, startDate, endDate, destination, description));
        }
        
    }

    return (
        <PaperProvider>
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <CustomHeader title={trip?.trip_name ?? 'Trip'}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <CustomText size={25}>Trip Name</CustomText>
                    <TextField text={name} error={nameError} onChange={handleName}></TextField>
                    <CustomText size={25}>Destination</CustomText>
                    <TextField text={destination} onChange={handleDestination}></TextField>
                    <CustomText size={25}>Date</CustomText>
                    <View style={[styles.dateContainer, g_STYLE.row]}>
                        <View style={styles.date}>
                            <TextField text={formatDate(startDate)} onPressText={handleStartDatePicker} />
                        </View>
                        {showStartDatePicker && <RNDateTimePicker
                            mode="date"
                            value={startDate}
                            onChange={handleStartDate}
                            minimumDate={new Date()}
                        />}
                        <CustomText size={25}>to</CustomText>
                        <View style={styles.date}>
                            <TextField text={formatDate(endDate)} onPressText={handleEndDatePicker} />
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
                    <View style={[styles.partnerContainer, g_STYLE.row]}>
                    <CustomText size={25}>Partners</CustomText>
                        <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
                    </View>
                    {/* <CustomText size={25}>Partners</CustomText>
                    <View style={[styles.partnerContainer, g_STYLE.row]}>
                        <View style={styles.partner}>
                            <TextField text={partner} onChange={handlePartner} hint="Send Invitation"></TextField>
                        </View>
                        <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
                    </View> */}
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View style={{ height: 5 }}></View>
                        }
                        data={tripPartners ? tripPartners?.trip_partners! : []}
                        renderItem={({ item, index }) => {
                            return <PartnerTile
                                name={item.user!.username}
                                uri={item.user!.user_icon_url}
                                onPress={() => handleDeletePartner(item.trip_partner_id)}
                                isPending={false}
                                isAdded={true}></PartnerTile>
                        }}>
                    </FlatList>
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View style={{ height: 5 }}></View>
                        }
                        data={tripPartners ? tripPartners?.trip_invitations! : []}
                        renderItem={({ item, index }) => {
                                return <PartnerTile
                                name={item.user?.name ?? item.user?.username ?? ""}
                                uri={item.user?.user_icon_url}
                                onPress={() => handleDeleteTripInvitation(item.trip_invitation_id)}
                                isPending={true}
                                isAdded={true}></PartnerTile>
                        }}>
                    </FlatList>
                    <View style={styles.saveButton}>
                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                    </View>
                </View>
            </ScrollView>
        </View>
        
        </PaperProvider>
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