import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import TripTile from "../../components/organisms/trip_tile";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import { AccountProps } from "../../navigation/stack_navigations/account_stack_navigation";
import CircularImage from "../../components/atoms/circular_image";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import IconButton from "../../components/atoms/icon_button";
import AccountTile from "../../components/organisms/account_tile";
import { Screen } from "react-native-screens";
import SeparateLine from "../../components/atoms/separate_line";

const SettingsScreen: React.FC<AccountProps<'Settings'>> = (props) => {
    let items = ['Theme', 'Language', 'Font Size'];
    let itemsIcon = ['palette', 'language', 'format-size'];

    const handleEdit = () => {
        props.navigation.navigate('Profile');
    }

    const handleTap = (index: number) => {
        switch (index) {
            case 0:
                props.navigation.navigate('Settings');
                break;
            case 1:
                props.navigation.navigate('PrivacyPolicy');
                break;
            case 2:
                props.navigation.navigate('TermsConditions');
                break;
            default:
                break;
        }
    }


    return (
        <View>
            <CustomHeader title={"Settings"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.account}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        renderItem={({ item, index }) => (
                            <View>
                                {index != 0 ? <SeparateLine isTextInclude={false} /> : null}
                                <TouchableOpacity onPress={() => handleTap(index)}>
                                    <AccountTile name={item} icon={itemsIcon[index]} />
                                </TouchableOpacity>
                            </View>
                        )}
                    /></View>
            </View>
        </View>
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