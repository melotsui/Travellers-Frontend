import React from 'react';
import { View } from 'react-native';
import g_STYLE from '../../styles/styles';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {

    return (
        <View style={{ overflow: 'hidden', borderRadius: 25 }}>
            <View style={[g_STYLE.textFieldContainer, g_STYLE.textFieldShadowProp]}>
                {children}
            </View>
        </View>
    );
};

export default Container;