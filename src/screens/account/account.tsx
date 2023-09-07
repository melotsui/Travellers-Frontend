import React, { ReactNode } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import CircularImage from "../../components/atoms/circular_image";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import IconButton from "../../components/atoms/icon_button";
import AccountTile from "../../components/organisms/account_tile";
import SeparateLine from "../../components/atoms/separate_line";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
import { RootProps } from "../../navigation/screen_navigation_props";
import { useSelector } from "react-redux";
import { userSelector } from "../../slices/user_slice";

const AccountScreen: React.FC<RootProps<'Account'>> = (props) => {
    let items = ['Personal Information', 'Settings', 'Privacy Policy', 'Terms & Conditions', 'Contact Us', 'Share', 'Logout'];
    let itemsIcon = ['account-circle','settings', 'assignment', 'handshake', 'call', 'share', 'logout'];
    const { user, loading, error } = useSelector(userSelector);

    const handleEdit = () => {
        props.navigation.navigate('Profile');
    }

    const handleTap = (index: number) => {
        switch (index) {
            case 0:
                props.navigation.navigate('PersonalInformation');
                break;
            case 1:
                props.navigation.navigate('Settings');
                break;
            case 2:
                props.navigation.navigate('PrivacyPolicy');
                break;
            case 3:
                props.navigation.navigate('TermsConditions');
                break;
            case 4:
                props.navigation.navigate('ContactUs');
                break;
            case 5:
                props.navigation.navigate('Share');
                break;
            default:
                break;
        }
    }
    
    const handleLogout = () => {
        props.navigation.navigate('Login', {share_id: ''});
    }

    const innerContent = (item: string, index: number): ReactNode => {
        return <View key={0}>
            <SeparateLine isTextInclude={false} />
            <TouchableOpacity onPress={() => handleTap(index)}>
                <AccountTile name={item} icon={itemsIcon[index]} />
            </TouchableOpacity>
        </View>
    }

    return (
        <PaperProvider>
            <View>
                <CustomHeader title={"Account"}></CustomHeader>
                <View style={styles.container}>
                    <View style={styles.account}>
                        <View style={[styles.profile, g_STYLE.row]}>
                            <CircularImage size={screenWidth * 0.25} uri={user?.user_icon_url} />
                            <View>
                            <CustomText size={25}>{user?.name}</CustomText>
                            <View style={{marginLeft: 5}}><CustomText size={15}>{user?.username}</CustomText></View>
                            </View>
                            <IconButton icon={'edit'} size={25} onPress={handleEdit} />
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={items}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item, index }) => {
                                if (index == 6) {
                                    return <GradientPopupDialog isSelect={true} title={'Reminder'} onPress={handleLogout}>
                                        {[innerContent(item, index),
                                        <CustomText size={20} key={1}>Are you sure you want to exit?</CustomText>]}
                                    </GradientPopupDialog>
                                } else {
                                    return <>{innerContent(item, index)}</>
                                }

                            }}
                        /></View>
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

export default AccountScreen;