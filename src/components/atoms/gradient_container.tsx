import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import g_THEME from '../../theme/theme';

interface GradientContainerProps {
    children: React.ReactNode;
    isLight?: boolean;
}

const GradientContainer: React.FC<GradientContainerProps> = ({ 
    children,
    isLight
}) => {
    return (
            <LinearGradient colors={isLight ? g_THEME.gradient.lightColors : g_THEME.gradient.colors} locations={g_THEME.gradient.locations}>
                {children}
            </LinearGradient>
    );
};

export default GradientContainer;