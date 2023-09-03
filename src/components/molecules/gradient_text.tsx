import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { View } from 'react-native';
import GradientContainer from '../atoms/gradient_container';
import CustomText from '../atoms/text';

interface GradientTextProps {
    children: React.ReactNode;
    size?: number;
    textAlign?: 'center' | 'left' | 'right' | 'auto' | 'justify' | undefined;
}

const GradientText: React.FC<GradientTextProps> = ({ children, size, textAlign }) => {

    return (
        <MaskedView maskElement={<CustomText size={size} textAlign={textAlign}>{children}</CustomText>}>
            <GradientContainer>
                <View style={{ opacity: 0 }}>
                    <CustomText size={size} textAlign={textAlign}>{children}</CustomText></View>
            </GradientContainer>
        </MaskedView>
    );
};


export default GradientText;