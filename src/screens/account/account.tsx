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

const AccountScreen: React.FC<RootProps<'Account'>> = (props) => {
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
            default:
                break;
        }
    }
    
    const handleLogout = () => {
        props.navigation.navigate('Login');
    }

    const innerContent = (item: string, index: number): ReactNode => {
        return <View>
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
                            <CircularImage size={screenWidth * 0.25} uri={'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                            <CustomText size={25}>Corgi Meme</CustomText>
                            <IconButton icon={'edit'} size={25} onPress={handleEdit} />
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={items}
                            renderItem={({ item, index }) => {
                                if (index == 5) {
                                    return <GradientPopupDialog isSelect={true} title={'Reminder'} onPress={handleLogout}>
                                        {[innerContent(item, index),
                                        <CustomText size={20}>Are you sure you want to exit?</CustomText>]}
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