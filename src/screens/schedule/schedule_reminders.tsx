import React, { useEffect, useState } from "react";
import { View, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import g_THEME from "../../theme/theme";
import CustomHeader from "../../components/molecules/header";
import { IconButton, PaperProvider } from "react-native-paper";
import { RootProps } from "../../navigation/screen_navigation_props";
import TextField from "../../components/molecules/text_field";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import CustomText from "../../components/atoms/text";
import g_STYLE from "../../styles/styles";
import { formatDate } from "../../utils/datetime_formatter";
import { screenWidth } from "../../constants/screen_dimension";
import GradientButton from "../../components/molecules/gradient_button";
import { FlatList } from "react-native-gesture-handler";
import Container from "../../components/atoms/container";
import GradientContainer from "../../components/atoms/gradient_container";

const ScheduleReminderScreen: React.FC<RootProps<'ScheduleReminder'>> = (props) => {
    const [time, setTime] = useState(0);
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // Your data for FlatList
    const [scrollValue, setScrollValue] = useState(0);

    const handleSave = () => {
        props.navigation.goBack();
    }

    const ITEM_HEIGHT = 25; // Adjust as needed

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.floor(contentOffset.y / ITEM_HEIGHT);
        const value = data[index];
        setScrollValue(value);
    };

    return (
        <PaperProvider>
            <View>
                <CustomHeader title={"Schedule Reminder"}>
                </CustomHeader>
                <View style={[styles.container, g_STYLE.col]}>
                    <View style={styles.text}>
                        <CustomText size={18} textAlign="center"> Set a reminder {"\n"} to get tight of the schedule! </CustomText>
                    </View>

                    <CustomText size={25}>Before schedule</CustomText>
                    <View style={{ height: 20 }}></View>
                    <Container>
                        <GradientContainer>
                            <View style={[g_STYLE.row, styles.timeSelect]}>
                                <FlatList
                                    data={['', '', ...data, '', '']}
                                    keyExtractor={(item, index) => index.toString()}
                                    onScroll={handleScroll}
                                    scrollEventThrottle={16} // Adjust as needed
                                    initialScrollIndex={5}
                                    getItemLayout={(_, index) => ({
                                        length: ITEM_HEIGHT,
                                        offset: ITEM_HEIGHT * index,
                                        index,
                                    })}
                                    renderItem={({ item }) => <CustomText size={20} color={scrollValue == item ? 'white' : g_THEME.colors.shadowBlue} textAlign="center" >{item}</CustomText>}
                                />
                                <View style={{ width: 20 }}></View>
                                <CustomText color={'white'} size={25}>mins</CustomText>
                            </View>
                        </GradientContainer>
                    </Container>

                    <View style={styles.saveButton}>
                        <GradientButton title={"Save"} onPress={handleSave}></GradientButton>
                    </View>
                </View>
            </View>
        </PaperProvider >
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    timeSelect: {
        height: 100,
        width: screenWidth * 0.4,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        width: screenWidth * 0.9,
        margin: 40,
    },
    saveButton: {
        alignItems: 'center',
        marginVertical: 60,
    }
});

export default ScheduleReminderScreen;