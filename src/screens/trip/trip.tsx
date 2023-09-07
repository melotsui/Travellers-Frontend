import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, BackHandler } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import TripTile from "../../components/organisms/trip_tile";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import { RootProps } from "../../navigation/screen_navigation_props";
import apis from "../../api/api_service";
import CustomText from "../../components/atoms/text";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { useFocusEffect } from "@react-navigation/native";
import { Trip } from "../../models/trip";
import { useDispatch, useSelector } from "react-redux";
import { DispatchThunk } from "../../store/store";
import { tripSelector } from "../../slices/trip_slice";
import { fetchTrips } from "../../actions/trip_actions";

const TripSearchScreen: React.FC<RootProps<'TripSearch'>> = (props) => {
    const [searchText, setSearchText] = useState('');
    const [isDialogVisible, setDialogVisible] = useState(false);
    const dispatch: DispatchThunk = useDispatch();
    const { trips } = useSelector(tripSelector);

    const backButtonPressCount = useRef(0);

    const handleBackPress = () => {
        backButtonPressCount.current++;

        if (backButtonPressCount.current === 1) {
            setTimeout(() => {
                backButtonPressCount.current = 0;
            }, 2000); // Reset the count after 2 seconds

            return true; // Allow the first back press
        } else if (backButtonPressCount.current === 2) {
            backButtonPressCount.current = 0;
            showDialog();

            return true; // Prevent the app from being closed immediately
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
            };
        }, [])
    );

    useEffect(() => {
        dispatch(fetchTrips());
        return () => {
            // Perform any cleanup tasks here if necessary
        };
    }, []);

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    }

    const handleTripTilePress = (trip_id: number) => {
        props.navigation.navigate('TripDetail', { 'trip_id': trip_id });
    }

    const handleLogout = () => {
        props.navigation.popToTop();
    }

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    return (
        <View>
            <CustomHeader isLogo={true} title={"Trip"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.text}>
                    <TextField hint={"Trip title, type and place"} text={searchText} onChange={handleSearchTextChange} suffixIcon={'search'} />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={trips}
                    keyExtractor={(trip: Trip) => trip.trip_id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleTripTilePress(item.trip_id)}>
                            <TripTile trip={item} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <GradientPopupDialog isSelect={true} title={'Reminder'} onPress={handleLogout} outVisible={isDialogVisible} onDismiss={hideDialog}>
                [ ,
                <CustomText size={20}>Are you sure you want to exit?</CustomText>]
            </GradientPopupDialog>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: screenHeight * 0.02,
    },
    text: {
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: 5
    },
});

export default TripSearchScreen;