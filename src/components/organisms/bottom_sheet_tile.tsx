import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../atoms/text';
import GradientText from '../molecules/gradient_text';

interface BottomSheetTileProps {
    children: React.ReactNode;
    onPress: () => void;
    color?: string;
}

const BottomSheetTile: React.FC<BottomSheetTileProps> = ({ children, onPress, color }) => {

    return (
        <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
        { color== null ? <GradientText size={25} textAlign={'center'}>{children}</GradientText> :
        <CustomText color={color} size={25} textAlign={'center'}>{children}</CustomText>}
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
});

export default BottomSheetTile;