import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { screenHeight, screenWidth } from "../../constants/screen_dimension";
import CustomHeader from "../../components/molecules/header";
import NotificationTile from "../../components/organisms/notification_tile";
import { DispatchThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification, respondNotification } from "../../actions/notification_actions";
import { NotificationSelector } from "../../slices/notification_slice";
import { formatDatetime } from "../../utils/datetime_formatter";
import Notification from "../../models/notification";
import { NotificationType } from "../../constants/types";

const NotificationsScreen: React.FC = (props) => {
    const dispatch: DispatchThunk = useDispatch();
    const { notifications } = useSelector(NotificationSelector);
    const [notificationList, setNotificationList] = useState<Notification[]>([]);

    useEffect(() => {
        dispatch(fetchNotification());
        console.log(notifications); 
    }, []);

    useEffect(() => {
        setNotificationList(notifications);
    }, [notifications]);

    const handleConfirm = (notification: Notification) => {
        if(notification.notification_type == NotificationType.TRIPINVITATION){
            dispatch(respondNotification(notification.parameters['trip_invitation_id'], true));
        }
    }

    const handleDisapprove = (notification: Notification) => {
        if(notification.notification_type == NotificationType.TRIPINVITATION){
            dispatch(respondNotification(notification.parameters['trip_invitation_id'], false));
        }
    }


        

    return (
        <View style={{backgroundColor: 'white'}}>
            <CustomHeader title={"Notifications"}></CustomHeader>
            <View style={styles.container}>
                {notifications && <FlatList
                    showsVerticalScrollIndicator={false}
                    data={notificationList}
                    renderItem={({ item }) => (
                            <NotificationTile 
                            content={item.notification_body.toString() ?? ''} 
                            name={item.notification_type.toString() ?? ''} 
                            datetime={formatDatetime(new Date(item.created_at)) ?? ''} 
                            isRead={item.is_read ?? false} 
                            isSelect={item.is_responded}
                            onConfirm={() => handleConfirm(item)}
                            onDisapprove={() => handleDisapprove(item)}
                            />
                    )}
                />}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: screenHeight * 0.02,
        marginBottom: screenHeight * 0.15,
    },
    text: {
        paddingHorizontal: screenWidth * 0.05,
    },
});

export default NotificationsScreen;