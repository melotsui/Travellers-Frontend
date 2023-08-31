import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import TripTile from "../../components/organisms/trip_tile";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import { HomeProps } from "../../navigation/stack_navigations/trip_stack_navigation";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import { Image } from "react-native";
import { Screen } from "react-native-screens";
import SeparateLine from "../../components/atoms/separate_line";
import CircularImage from "../../components/atoms/circular_image";
import GradientButton from "../../components/molecules/gradient_button";
import Container from "../../components/atoms/container";
import g_THEME from "../../theme/theme";
import RoundRectImage from "../../components/atoms/round_rect_image";
import ScheduleTile from "../../components/organisms/schedule_tile";
import { ActivityTypes } from "../../constants/types";
import CustomHeader from "../../components/molecules/header";
import IconButton from "../../components/atoms/icon_button";

const TripDetailScreen: React.FC<HomeProps<'TripDetail'>> = (props) => {
    const [schedules, setSchedules] = useState(['a']);

    const handleScheduleTileChange = () => {
        console.log("schedule tile pressed");
        //props.navigation.navigate('TripDetail');
    }

    return (
        <View>
            <CustomHeader title={"Japan Gogo"}>
                <IconButton onPress={function (): void {
                    throw new Error("Function not implemented.");
                } } icon={"pin-drop"}/>
                <View style={{width: 10 }}></View>
                <IconButton onPress={function (): void {
                    throw new Error("Function not implemented.");
                } } icon={"more-horiz"}/>
            </CustomHeader>
            <View style={[styles.container, g_STYLE.col]}>
                <View>
                    <View style={g_STYLE.row}>
                        <View style={[g_STYLE.col, styles.leftContainer]}>
                            <CustomText size={25}>Osaka</CustomText>
                            <CustomText>20/12/2023 - 25/12/2023</CustomText>
                        </View>
                        <View style={styles.rightContainer}>
                            <CircularImage size={screenWidth * 0.15} uri={'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png'} />
                            {/*<Image source={{ uri: 'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png' }} style={styles.image} />*/}
                        </View>
                    </View>
                    <View style={styles.description}>
                        <CustomText>Trip of Samoyed Meme and Master Vivi</CustomText>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        ItemSeparatorComponent={() =>
                            <View style={{ width: screenWidth * 0.02 }}></View>
                        }
                        data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                        renderItem={({ item }) => (
                            <RoundRectImage uri={'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png'}></RoundRectImage>
                        )}
                    ></FlatList>
                </View>
                <View style={styles.space}></View>
                <SeparateLine isTextInclude={false} />
                <View style={styles.space}></View>
                {schedules.length == 0 &&
                    <View style={styles.lowerContainer}>
                        <CustomText size={25} textAlign={'center'}>Your Trip is empty{'\n'}Let's add schedule !!</CustomText>
                        <View style={styles.space}></View>
                        <GradientButton size={20} title={"Add Schedule"} radius={35} onPress={function (): void {
                            throw new Error("Function not implemented.");
                        }} />
                    </View>}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 5 }}></View>
                    }
                    data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={handleScheduleTileChange}>
                            <ScheduleTile step={index} title={"Dotombori District"} subTitle={"Sushiro"} date={"20/12/2023"} time={"10:00 - 12:00"} type={ActivityTypes.FOOD} transportTime={"15 mins"}></ScheduleTile>
                        </TouchableOpacity>
                    )}
                ></FlatList>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    description: {
        backgroundColor: g_THEME.colors.lightBlue,
        borderRadius: 5,
        padding: 5,
    },
    leftContainer: {
        flex: 3,
        justifyContent: 'flex-end',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    space: {
        height: 10,
    },
    lowerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    }
});

export default TripDetailScreen;