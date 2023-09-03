import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GradientContainer from '../../components/atoms/gradient_container';
import { useBottomSheet } from '../../context/bottom_sheet_context';


interface GradientBottomSheetProps {
    children: React.ReactNode;
    isVisible: boolean;
}

const GradientBottomSheet: React.FC<GradientBottomSheetProps> = ({ children, isVisible }) => {
    const { hideBottomSheet, content } = useBottomSheet();

    return (<GestureHandlerRootView style={styles.container}>
        {children}
        {isVisible && (
            <>
                <Pressable style={styles.backdrop} onPress={hideBottomSheet} />
                <View style={styles.sheet}>
                    <GradientContainer>
                        <View style={styles.outerContainer}>
                            <View style={styles.innerContainer}>
                                {content}
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
        zIndex: 1,
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
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default GradientBottomSheet;
