import { View } from "react-native";
import { ActivityTypes } from "../../constants/types";
import g_THEME from "../../theme/theme";
import g_STYLE from "../../styles/styles";
import { StyleSheet } from "react-native";
import CustomText from "../atoms/text";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import getActivityIcon from "../../helpers/activity_icon";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { opacity } from "react-native-reanimated";
import SeparateLine from "../atoms/separate_line";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ScheduleTileProps {
    step: number;
    title: string;
    subTitle: string;
    date: string;
    time: string;
    type: ActivityTypes;
    transportTime?: string;
    onPress: () => void;
}

const ScheduleTile: React.FC<ScheduleTileProps> = ({ step, title, subTitle, date, time, type, transportTime, onPress }) => {
    return (
        <View style={g_STYLE.col}>
            <TouchableOpacity onPress={onPress}>
                <View style={[g_STYLE.row, styles.container]}>
                    <View style={styles.step}>
                        <CustomText>{step + 1}</CustomText>
                    </View>
                    <View style={styles.titleContainer}>
                        <CustomText>{title}</CustomText>
                        <CustomText>{subTitle}</CustomText>
                    </View>
                    <View style={styles.activity}>
                        <MaterialIcons color={g_THEME.colors.primary} size={25} name={getActivityIcon(ActivityTypes.FOOD)}></MaterialIcons>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <CustomText>{date}</CustomText>
                        <CustomText>{time}</CustomText>
                    </View>
                </View>
            </TouchableOpacity>
            {transportTime != null && <View>
                <View style={styles.dottedLine}></View>
                <View style={g_STYLE.row}>
                    <MaterialIcons color={'rgba(0, 0, 0, 0.21)'} size={20} name={'directions-car'}></MaterialIcons>
                    <View style={{ marginHorizontal: 10 }}>
                        <CustomText color={g_THEME.colors.grey} size={16} >{transportTime}</CustomText>
                    </View>
                    <View style={styles.line}>
                        <SeparateLine isTextInclude={false} color={'rgba(0, 0, 0, 0.21)'}></SeparateLine>
                    </View>
                </View>
                <View style={styles.dottedLine}></View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    step: {
        width: 20,
        height: 20,
        borderRadius: 15,
        backgroundColor: g_THEME.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    activity: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTimeContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    dottedLine: {
        width: 10,
        height: 10,
        borderStyle: 'dotted',
        borderRightColor: 'rgba(0, 0, 0, 0.21)',
        borderRightWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScheduleTile;
