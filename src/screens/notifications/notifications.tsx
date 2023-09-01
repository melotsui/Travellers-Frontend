import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import NotificationTile from "../../components/organisms/notification_tile";

const NotificationsScreen: React.FC = () => {

    return (
        <View style={{backgroundColor: 'white'}}>
            <CustomHeader title={"Notifications"}></CustomHeader>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                    renderItem={({ item }) => (
                            <NotificationTile content={"It’s time to go to dotombori district to eat sushiro!!!!"} name={"Japan Gogo"} datetime={"20/12/2023/ 12:00"} isRead={false} />
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
    },
});

export default NotificationsScreen;