import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import PartnerTile from "../../components/organisms/partner_tile";
import g_THEME from "../../theme/theme";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import GradientButton from "../../components/molecules/gradient_button";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { User } from "../../models/user";
import { DispatchThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSchedulesAccesses } from "../../actions/schedule_actions";
import { tripSelector } from "../../slices/trip_slice";
type UserState = {
    user: User;
    isSelected: boolean;
}

const ScheduleAccessScreen: React.FC<RootProps<'ScheduleAccess'>> = (props) => {
    const { schedule_id } = props.route.params;
    const [partners, setPartners] = useState<UserState[]>([]);
    const [isAll, setIsAll] = useState<boolean>(false);
    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await apis.schedule.getScheduleAccess(schedule_id)
                .then((res) => {
                    const result: UserState[] = Array.from(res).map((item) => ({ user: item, isSelected: item.is_active as boolean }));
                    setPartners(result);
                }).catch((err) => {
                    console.log(err);
                })
        }
        fetchData();
    }, []);

    const handleSelectAll = () => {
        if (!isAll) {
            partners.forEach((item) => item.isSelected = false);
        }
        setIsAll(!isAll);
    }

    const handleSelect = (index: number) => {
        partners[index].isSelected = !partners[index].isSelected;
        setPartners([...partners]);
        if(partners[index].isSelected) {
            setIsAll(false);
        }
        // let temp = [...partnersSelected];
        // temp[index] = !temp[index];
        // setPartnersSelected(temp);
    }

    const handleSave = () => {
        if (isAll) {
            dispatch(setSchedulesAccesses(schedule_id, []))
        } else {
            const partnerAccess = partners.filter((item) => item.isSelected).map((item) => item.user.user_id);
            dispatch(setSchedulesAccesses(schedule_id, partnerAccess));
        }
    }

    const handleCancel = () => {
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <CustomHeader title={"Schedule Access"}></CustomHeader>
            <View style={styles.container}>
                <CustomText size={20}>Add Permission to Partner</CustomText>
            </View>
            <View style={styles.partnerContainer}>
                <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={['', partners]}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return <TouchableOpacity onPress={handleSelectAll}>
                                <PartnerTile
                                    name={"All Partners"}
                                    isPending={false}
                                    onPress={handleSelectAll}
                                    isSelect={isAll}></PartnerTile>
                            </TouchableOpacity>
                        } else {
                            return <TouchableOpacity onPress={() => handleSelect(index - 1)}>
                                {partners[index - 1] ? <PartnerTile
                                    name={partners[index - 1].user.name ?? partners[index - 1].user.username ?? ""}
                                    uri={partners[index - 1].user.user_icon_url}
                                    isPending={false}
                                    onPress={() => handleSelect(index - 1)}
                                    isSelect={partners[index - 1].isSelected}></PartnerTile> : null}
                            </TouchableOpacity>
                        }
                    }}
                />
            </View>
            <View style={[styles.saveButton, g_STYLE.row]}>
                <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                <GradientButton title={"Cancel"} onPress={handleCancel} color={g_THEME.colors.grey}></GradientButton>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        paddingTop: screenHeight * 0.02,
    },
    partnerContainer: {
        width: screenWidth,
        marginVertical: 10,
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 60,
    }
});

export default ScheduleAccessScreen;