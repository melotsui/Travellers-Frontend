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
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
"../../utils/datetime_formatter";

const ProfileScreen: React.FC<AccountProps<'Profile'>> = (props) => {
    const [name, setName] = useState('Japan Gogo');
    const [email, setEmail] = useState('');
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(0);
    let isVerify = false;

    const handleName = (value: string) => {
        setName(value);
    }

    const handleEmail = (value: string) => {
        setEmail(value);
    }

    const handleNationality = (value: string) => {
        setNationality(value);
    }

    const handleGender = (value: string) => {
        setGender(value);
    }

    const handleAge = (value: string) => {
        setAge(parseInt(value));
    }

    const handleChangePassword = () => {
        props.navigation.navigate('ChangePassword');
    }

    const handleSave = () => {
        console.log('save');
    }

    return (
        <PaperProvider>
            <CustomHeader title={"Japan Gogo"}></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <View style={styles.image}>
                        <CircularImage size={screenWidth * 0.35} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                    </View>

                    <CustomText size={20}>Username</CustomText>
                    <TextField text={name} onChange={handleName}></TextField>
                    <View style={styles.space}></View>

                    <View style={g_STYLE.row}>
                        <CustomText size={20}>Email</CustomText>
                        <View style={styles.horizontalSpace}></View>
                        {isVerify ?
                            <MaterialIcons name={"check-circle-outline"} size={20} color={'green'} /> :
                            <MaterialIcons name={"error-outline"} size={20} color={g_THEME.colors.error} />}
                    </View>
                    <View style={g_STYLE.row}>
                        <View style={styles.verifyButton}>
                            <TextField text={email} onChange={handleEmail}></TextField>
                        </View>
                        <GradientPopupDialog isSelect={false} title="Reminder">
                            {[
                                <GradientButton title={"Verify"} width={0.2} size={20}></GradientButton>,
                                <CustomText size={20}>Verification link is sent to your email</CustomText>
                            ]}
                        </GradientPopupDialog>
                    </View>
                    <View style={styles.space}></View>

                    <CustomText size={20}>Nationality</CustomText>
                    <TextField text={nationality} onChange={handleNationality}></TextField>
                    <View style={styles.space}></View>

                    <View style={[styles.ageGenderContainer, g_STYLE.row]}>
                        <View style={[styles.ageGender, g_STYLE.col]}>
                            <CustomText size={20}>Gender</CustomText>
                            <TextField text={gender} onChange={handleGender} />
                        </View>
                        <View style={[styles.ageGender, g_STYLE.col]}>
                            <CustomText size={20}>Age</CustomText>
                            <TextField text={age.toString()} onChange={handleAge} />
                        </View>
                    </View>
                    <View style={styles.space}></View>

                    <View style={styles.buttons}>
                        <GradientButton title={"Change Password"} onPress={handleChangePassword} width={0.7}></GradientButton>
                        <GradientButton title={"Save"} onPress={handleSave} width={0.7}></GradientButton>
                    </View>
                </View >
            </ScrollView >
        </PaperProvider >
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
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
        marginVertical: 60,
    }
});

export default ProfileScreen;