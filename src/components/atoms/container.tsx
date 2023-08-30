import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import g_STYLE from '../../styles/styles';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {

    return (
        <View style={styles.container}>
            <View style={[g_STYLE.textFieldContainer, g_STYLE.textFieldShadowProp]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        paddingBottom: 1,
        elevation: 1,
        borderRadius: 25
    },
});


export default Container;