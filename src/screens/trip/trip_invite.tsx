import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";
import TextField from "../../components/molecules/text_field";
import PartnerTile from "../../components/organisms/partner_tile";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { shareFriend } from "../../helpers/share";
import { screenWidth } from "../../constants/screen_dimension";
import g_THEME from "../../theme/theme";
import TextButton from "../../components/atoms/text_button";
import { TripInvitation } from "../../models/trip_invitation";

const TripInviteScreen: React.FC<RootProps<'TripInvite'>> | React.FC = (props: any) => {
    const { trip_id } = props.route.params;
    const [partner, setPartner] = useState<string>('');
    const [tripPartners, setTripPartners] = useState<TripInvitation[]>([]);

    const handlePartner = (text: string) => {
        setPartner(text);
    }

    const handleShare = () => {
        const trip = new Map();
        trip.set('trip_id', trip_id);
        shareFriend('Join travellers! Let\'s plan your trip together', trip);
    }

    const handleInvitePartner = async () => {
        await apis.trip.sendTripInvitation(trip_id, 0)
            .then((response) => {
                setTripPartners([...tripPartners, response]);
                console.log('success to invite partner');
            })
            .catch((error) => {
                console.log('failed to invite partner');
            });
    }

    const handleDeletePartner = async (trip_invitation: TripInvitation) => {
        const index = tripPartners.indexOf(trip_invitation);
        if (index > -1) {
            tripPartners.splice(index, 1);
        }
        await apis.trip.respondTripInvitation(trip_invitation.trip_invitation_id, false)
            .then((response) => {
                console.log('success to delete partner');
            })
            .catch((error) => {
                console.log('failed to delete partner');
            });
    }

    const handleContinue = () => {
        props.navigation.navigate('TripDetail', { trip_id: trip_id });
    }

    return (
        <View style={styles.container}>
            <CustomHeader title={'Invite Partners'}></CustomHeader>
            {/* inapp invite */}
            <CustomText size={22}> Invitation to user</CustomText>
            <View style={[styles.partnerContainer, g_STYLE.row]}>
                <View style={styles.partner}>
                    <TextField text={partner} onChange={handlePartner} hint="Send Invitation"></TextField>
                </View>
                <IconButton onPress={handleInvitePartner} icon={"person-add"}></IconButton>
            </View>
            <View style={{flex: 1}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() =>
                    <View style={{ height: 5 }}></View>
                }
                data={tripPartners}
                renderItem={({ item }) => (
                    <PartnerTile
                        name={item.user?.name ?? ''}
                        uri={item.user?.user_icon_url}
                        onPress={() => handleDeletePartner(item)}
                        isPending={false}></PartnerTile>
                )}>
            </FlatList>
            </View>
            <View style={styles.saveButton}>
                <GradientButton title={"Continue"} width={0.4} onPress={handleContinue}></GradientButton>
            </View>
            {/* outapp invite */}
            <View style={styles.shareContainer}>
                <CustomText size={16} textAlign="center"> Your friends don't have the account? here's way to share your trip!</CustomText>
                <GradientButton title={"Share"} width={0.7} onPress={handleShare}></GradientButton>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        flex: 1
    },
    shareContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    partnerContainer: {
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    partner: {
        width: '90%'
    },
    saveButton: {
        alignItems: 'center',
        marginVertical: 10,
    }
});

export default TripInviteScreen;