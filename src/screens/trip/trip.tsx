import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextField from "../../components/molecules/text_field";
import TripTile from "../../components/organisms/trip_tile";
import { screenHeight } from "../../constants/screen_dimension";
import { HomeProps } from "../../navigation/stack_navigations/trip_stack_navigation";

const TripSearchScreen: React.FC<HomeProps<'TripSearch'>> = (props) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    }

    const handleTripTilePress = () => {
        console.log("trip tile pressed");
        //props.navigation.navigate('TripDetail');
    }

    return (
        <View style={styles.container}>
            <TextField hint={"Trip title, type and place"} text={searchText} onChange={handleSearchTextChange} suffixIcon={'search'} />
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
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: screenHeight * 0.02,
    },
});

export default TripSearchScreen;