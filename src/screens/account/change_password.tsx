import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import TextField from "../../components/molecules/text_field";
import g_THEME from "../../theme/theme";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import { useSelector } from "react-redux";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { userSelector } from "../../slices/user_slice";

const ChangePasswordScreen: React.FC<RootProps<'ChangePassword'>> = (props) => {
    const { user } = useSelector(userSelector);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isDialogVisible, setDialogVisible] = useState(false);

    const handleOldPassword = (value: string) => {
        setOldPasswordError('');
        setOldPassword(value);
    }

    const handleNewPassword = (value: string) => {
        setNewPasswordError('');
        setNewPassword(value);
    }

    const handleConfirmPassword = (value: string) => {
        setConfirmPasswordError('');
        setConfirmPassword(value);
    }

    const handleSave = async () => {
        if (oldPassword == '') {
            setOldPasswordError('Old password cannot be empty');
            return;
        }
        if (newPassword == '') {
            setNewPasswordError('New password cannot be empty');
            return;
        }
        if (confirmPassword == '') {
            setConfirmPasswordError('Confirm password cannot be empty');
            return;
        }
        if (newPassword != confirmPassword) {
            setConfirmPasswordError('Confirm password is not same as new password');
            return;
        }
        setDialogVisible(true);
        await apis.user.resetPassword(user!.user_id!, oldPassword, newPassword)
            .then((response) => {
                console.log('success to reset password', response);
            })
            .catch((error) => {
                console.log('failed to reset password', error);
                setOldPasswordError(error);
            });
    }

    const handleCancel = () => {
        props.navigation.goBack();
    }

    const hideDialog = () => {
        setDialogVisible(false);
    };

    return (
        <View>
            <CustomHeader title={"Japan Gogo"}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>

                    <CustomText size={20}>Old Password</CustomText>
                    <TextField text={oldPassword} error={oldPasswordError} onChange={handleOldPassword} secure></TextField>
                    <View style={styles.space}></View>

                    <CustomText size={20}>New Password</CustomText>
                    <TextField text={newPassword} error={newPasswordError} onChange={handleNewPassword} secure></TextField>
                    <View style={styles.space}></View>

                    <CustomText size={20}>Confirm Password</CustomText>
                    <TextField text={confirmPassword} error={confirmPasswordError} onChange={handleConfirmPassword} secure></TextField>
                    <View style={styles.space}></View>

                    <View style={[styles.buttons, g_STYLE.row]}>
                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                        <GradientButton title={"Cancel"} onPress={handleCancel} color={g_THEME.colors.grey}></GradientButton>
                    </View>
                    <GradientPopupDialog isSelect={false} title={'Reminder'} onPress={handleSave} outVisible={isDialogVisible} onDismiss={hideDialog}>
                        [ ,
                        <CustomText size={20}>The password has successfully changed.</CustomText>]
                    </GradientPopupDialog>
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