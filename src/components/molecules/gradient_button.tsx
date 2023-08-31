import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import GradientContainer from '../atoms/gradient_container';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  radius?: number;
  width?: number;
  size?: number;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  radius,
  width,
  size,
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
      fontSize: size ? size : 25,
      fontFamily: g_THEME.fonts.regular,
      textAlign: 'center',
      paddingVertical: screenHeight * 0.01,
      paddingHorizontal: screenWidth * 0.01,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <GradientContainer>
        <Text style={styles.buttonText}>{title}</Text>
      </GradientContainer>
    </TouchableOpacity>
  );
};




export default GradientButton;