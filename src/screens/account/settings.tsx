import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { screenHeight } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import AccountTile from "../../components/organisms/account_tile";
import SeparateLine from "../../components/atoms/separate_line";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
import BulletPoint from "../../components/organisms/bullet_point";
import { RootProps } from "../../navigation/screen_navigation_props";

const SettingsScreen: React.FC<RootProps<'Settings'>> = (props) => {
    let items = ['Theme', 'Language', 'Font Size'];
    let itemsIcon = ['palette', 'language', 'format-size'];

    const handleEdit = () => {
        props.navigation.navigate('Profile');
    }

    const getPopupContent = (index: number) => {
        switch (index) {
            case 0:
                return <View>
                    <BulletPoint name={"Light"} isSelected={true}></BulletPoint>
                    <BulletPoint name={"Dark"} isSelected={false}></BulletPoint>
                    <BulletPoint name={"Default"} isSelected={false}></BulletPoint>
                </View>
            case 1:
                return <View>
                    <BulletPoint name={"Traditional Chinese"} isSelected={true}></BulletPoint>
                    <BulletPoint name={"English"} isSelected={false}></BulletPoint>
                    <BulletPoint name={"Simplified Chinese"} isSelected={false}></BulletPoint>
                </View>
            case 2:
                return <View>
                    <BulletPoint name={"Large"} isSelected={true}></BulletPoint>
                    <BulletPoint name={"Medium"} isSelected={false}></BulletPoint>
                    <BulletPoint name={"Small"} isSelected={false}></BulletPoint>
                </View>
            default:
                break;
        }
    }


    return (
        <PaperProvider>
            <CustomHeader title={"Settings"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.account}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        renderItem={({ item, index }) => (
                            <View>
                                {index != 0 ? <SeparateLine isTextInclude={false} /> : null}
                                <GradientPopupDialog isSelect={true} title={"Select " + items[index]}>
                                    {[
                                        <AccountTile name={item} icon={itemsIcon[index]} />,
                                        getPopupContent(index)
                                    ]}
                                </GradientPopupDialog>
                            </View>
                        )}
                    /></View>
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