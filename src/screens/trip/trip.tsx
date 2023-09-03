import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import TripTile from "../../components/organisms/trip_tile";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import { HomeProps } from "../../navigation/stack_navigations/trip_stack_navigation";
import CustomHeader from "../../components/molecules/header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TripSearchScreen: React.FC<HomeProps<'TripSearch'>> = (props) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    }

    const handleTripTilePress = () => {
        props.navigation.navigate('TripDetail');
    }

    return (
        <View>
            <CustomHeader isLogo={true} title={"Trip"}></CustomHeader>
            <View style={styles.container}>
                <View style={styles.text}>
                    <TextField hint={"Trip title, type and place"} text={searchText} onChange={handleSearchTextChange} suffixIcon={'search'} />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={handleTripTilePress}>
                            <TripTile />
                        </TouchableOpacity>
                    )}
                />
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
    text: {
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: 5
    },
});

export default TripSearchScreen;