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
import { addTrip, deleteTripPartner, deleteTripInvitation, fetchTrip, fetchTripPartner, updateTrip, deleteTrip } from "../../actions/trip_actions";
import { tripSelector } from "../../slices/trip_slice";
import { PaperProvider } from "react-native-paper";
import g_THEME from "../../theme/theme";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { userSelector } from "../../slices/user_slice";

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
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const { user } = useSelector(userSelector);
    const rtrip = useSelector(tripSelector).trip;
    const rtripPartners = useSelector(tripSelector).tripPartners;
    const rtripInvitations = useSelector(tripSelector).tripInvitations;
    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {

        if (trip_id == null) return;
        dispatch(fetchTrip(trip_id));
        dispatch(fetchTripPartner(trip_id));

        return () => {
            // Perform any cleanup tasks here if necessary
        };
    }, []);

    useEffect(() => {
        if (rtrip == null || !trip_id) return;
        setTrip(rtrip);
        setName(rtrip.trip_name);
        setDestination(rtrip.trip_destination ?? '');
        setStartDate(new Date(rtrip!.trip_datetime_from ?? ''));
        setEndDate(new Date(rtrip!.trip_datetime_to ?? ''));
        setDescription(rtrip.trip_description ?? '');
    }, [rtrip]);

    useEffect(() => {
        if (rtripPartners == null || !trip_id) return;
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
        props.navigation.navigate('TripInvite', { trip_id: trip_id, trip_name: trip?.trip_name });
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

    const handleDelete = async () => {
        dispatch(deleteTrip(trip_id));
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
                        </View>
                        <CustomText size={25}>Description</CustomText>
                        <TextField text={description} onChange={handleDescription} numberOfLines={4}></TextField>
                        {trip_id && <>
                            <View style={[styles.partnerContainer, g_STYLE.row]}>
                                <CustomText size={25}>Partners</CustomText>
                                <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
                            </View>
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
                                        isAdded={true}
                                        noSuffix={user?.user_id == item.user?.user_id}></PartnerTile>
                                }}>
                            </FlatList>
                            {/* <FlatList
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
                                        isAdded={true}
                                        ></PartnerTile>
                                }}>
                            </FlatList> */}
                            </>}
                        <View style={styles.saveButton}>
                            <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                            {trip_id && <GradientPopupDialog isSelect={true} title="Reminder" onPress={handleDelete}>
                                {[
                                    <GradientButton title={"Delete"} color={g_THEME.colors.error} key={0}></GradientButton>,
                                    <CustomText size={20} key={1}>Are you sure to delete this schedule? Everyone will not be able to access the trip again</CustomText>
                                ]}
                            </GradientPopupDialog>}
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