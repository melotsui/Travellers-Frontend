import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { screenHeight } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import AccountTile from "../../components/organisms/account_tile";
import SeparateLine from "../../components/atoms/separate_line";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
import { RootProps } from "../../navigation/screen_navigation_props";
import CustomText from "../../components/atoms/text";

const SettingsScreen: React.FC<RootProps<'PersonalInformation'>> = (props) => {

    const handleEmail = () => {
        props.navigation.navigate('EmailVerification', { isEdit: true });
    }

    return (
        <PaperProvider>
            <CustomHeader title={"Personal Information"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.account}>
                    <TouchableOpacity onPress={handleEmail}>
                        <AccountTile name={"Email"} icon={'email'} />
                    </TouchableOpacity>
                    <SeparateLine isTextInclude={false} />
                    <GradientPopupDialog isSelect={false} title={"Reminder"}>
                        {[
                            <AccountTile name={'Phone'} icon={'phone'} key={0}/>,
                            <CustomText size={20} key={1}>Not Yet Open</CustomText>
                        ]}
                    </GradientPopupDialog>

                </View>
            </View>
        </PaperProvider>
    );

}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: screenHeight * 0.02,
    },
    account: {
        width: '90%',
    },
    profile: {
        width: '90%',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    }
});

export default SettingsScreen;