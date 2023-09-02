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

const AccountScreen: React.FC<AccountProps<'Account'>> = (props) => {
    let items = ['Settings', 'Privacy Policy', 'Terms & Conditions', 'Contact Us', 'Share', 'Logout'];
    let itemsIcon = ['settings', 'assignment', 'handshake', 'call', 'share', 'logout'];

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
            case 3:
                props.navigation.navigate('ContactUs');
                break;
            case 4:
                props.navigation.navigate('Share');
                break;
            case 5:
                console.log('logout');
                break;
            default:
                break;
        }
    }


    return (
        <View>
            <CustomHeader title={"Account"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.account}>
                    <View style={[styles.profile, g_STYLE.row]}>
                        <CircularImage size={screenWidth * 0.25} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                        <CustomText size={25}>Corgi Meme</CustomText>
                        <IconButton icon={'edit'} size={25} onPress={handleEdit} />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        renderItem={({ item, index }) => (
                            <View>
                                <SeparateLine isTextInclude={false} />
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

export default AccountScreen;