import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import g_THEME from '../../theme/theme';

interface GradientContainerProps {
    children: React.ReactNode;
}

const GradientContainer: React.FC<GradientContainerProps> = ({ 
    children,
}) => {
    return (
            <LinearGradient colors={g_THEME.gradient.colors} locations={g_THEME.gradient.locations}>
                {children}
            </LinearGradient>
    );
};

export default GradientContainer;