import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import GradientContainer from '../atoms/gradient_container';
import CustomText from '../atoms/text';

interface GradientButtonProps {
  title: string;
  onPress?: () => void;
  radius?: number;
  width?: number;
  size?: number;
  color?: string;
  textColor?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  radius,
  width,
  size,
  color,
  textColor,
}) => {

  const styles = StyleSheet.create({
    button: {
      borderRadius: radius ? radius : 25,
      overflow: 'hidden',
      width: screenWidth * (width ?? 0.3),
      marginVertical: screenHeight * 0.01,
      marginHorizontal: screenWidth * 0.01,
      backgroundColor: color ? color : 'transparent',
    },
    buttonText: {
      fontFamily: g_THEME.fonts.regular,
      alignItems: 'center',
      paddingVertical: screenHeight * 0.01,
      paddingHorizontal: screenWidth * 0.01,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button} disabled={onPress == null}>
      {color == null ?
        <GradientContainer>
          <View style={styles.buttonText}>
            <CustomText size={size ? size : 25} color={textColor ? textColor :　'white'}>{title}</CustomText>
          </View>
        </GradientContainer> :
        <View style={styles.buttonText}>
          <CustomText size={size ? size : 25} color={textColor ? textColor : 'white'}>{title}</CustomText>
        </View>
      }
    </TouchableOpacity>
  );
};




export default GradientButton;