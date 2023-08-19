import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  radius?: number;
  width?: number;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  radius,
  width,
}) => {

  const styles = StyleSheet.create({
    button: {
      borderRadius: radius ? radius : 25,
      overflow: 'hidden',
      width: screenWidth * (width ?? 0.3),
      marginVertical: screenHeight * 0.01,
      marginHorizontal: screenWidth * 0.01
    },
    buttonText: {
      color: 'white',
      fontSize: 25,
      fontFamily: g_THEME.fonts.regular,
      textAlign: 'center',
      paddingVertical: screenHeight * 0.01,
      paddingHorizontal: screenWidth * 0.01,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <LinearGradient colors={g_THEME.gradient.colors} locations={g_THEME.gradient.locations}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};




export default GradientButton;