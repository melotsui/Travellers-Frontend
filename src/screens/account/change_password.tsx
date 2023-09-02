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
import { formatDate, formatTime, parseDate, parseTime } from "../../utils/datetime_formatter";
import PartnerTile from "../../components/organisms/partner_tile";
import { AccountProps } from "../../navigation/stack_navigations/account_stack_navigation";
import CircularImage from "../../components/atoms/circular_image";
import { screenWidth } from "../../constants/screen_dimension";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import g_THEME from "../../theme/theme";
"../../utils/datetime_formatter";

const ChangePasswordScreen: React.FC<AccountProps<'ChangePassword'>> = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOldPassword = (value: string) => {
        setOldPassword(value);
    }

    const handleNewPassword = (value: string) => {
        setNewPassword(value);
    }

    const handleConfirmPassword = (value: string) => {
        setConfirmPassword(value);
    }

    const handleSave = () => {
        //props.navigation.navigate('ChangePassword');
    }

    const handleCancel = () => {
        console.log('cancel');
    }

    return (
        <View>
            <CustomHeader title={"Japan Gogo"}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>

                    <CustomText size={20}>Old Password</CustomText>
                    <TextField text={oldPassword} onChange={handleOldPassword}></TextField>
                    <View style={styles.space}></View>

                    <CustomText size={20}>New Password</CustomText>
                    <TextField text={newPassword} onChange={handleNewPassword}></TextField>
                    <View style={styles.space}></View>

                    <CustomText size={20}>Confirm Password</CustomText>
                    <TextField text={confirmPassword} onChange={handleConfirmPassword}></TextField>
                    <View style={styles.space}></View>

                    <View style={[styles.buttons, g_STYLE.row]}>
                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                        <GradientButton title={"Cancel"} onPress={handleCancel} color={g_THEME.colors.grey}></GradientButton>
                    </View>
                </View >
            </ScrollView >
        </View >
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 40,
        alignContent: 'center',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalSpace: {
        width: 5,
    },
    space: {
        height: 10,
    },
    verifyButton: {
        flex: 1
    },
    ageGenderContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ageGender: {
        marginRight: 10,
        width: '40%',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 60,
    }
});

export default ChangePasswordScreen;