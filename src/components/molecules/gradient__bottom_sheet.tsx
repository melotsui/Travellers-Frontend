import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import GradientButton from '../../components/molecules/gradient_button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GradientContainer from '../../components/atoms/gradient_container';
import CustomText from '../atoms/text';
import { opacity } from 'react-native-reanimated';


interface GradientBottomSheetProps {
    children: React.ReactNode;
}

const GradientBottomSheet: React.FC<GradientBottomSheetProps> = ({ children }) => {

    const [isOpen, setOpen] = useState(false);

    const toggleSheet = () => {
        setOpen(!isOpen);
    };

    return (<GestureHandlerRootView style={styles.container}>
        <TouchableOpacity onPress={toggleSheet}>
            {children}
        
            </TouchableOpacity>
            {isOpen && (
                <>
                    <Pressable style={styles.backdrop} onPress={toggleSheet} />
                    <View style={styles.sheet}>
                        <GradientContainer>
                            <View style={styles.outerContainer}>
                                <View style={styles.innerContainer}>
                                    <CustomText>afa</CustomText>
                                </View>
                            </View>
                        </GradientContainer>
                    </View>
                </>
            )}
    </GestureHandlerRootView>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    sheet: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        zIndex: 1,
        overflow: 'hidden',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'grey',
        opacity: 0.5,
    },
    outerContainer: {
        height: '100%',
        width: '100%',
    },
    innerContainer: {
        margin: 8,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 16,
    }
});

export default GradientBottomSheet;
