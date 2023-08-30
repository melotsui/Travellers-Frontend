import { View, Text } from "react-native";
import { HomeProps } from "../../navigation/stack_navigations/trip_stack_navigation";

const TripSearchScreen: React.FC<HomeProps<'TripSearch'>> = (props) => {
    return (
        <View>
            <Text>Trip Search Screen</Text>
        </View>
    );

}
    
export default TripSearchScreen;