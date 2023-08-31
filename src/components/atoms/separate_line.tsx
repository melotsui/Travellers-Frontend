import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenWidth } from '../../constants/screen_dimension';

interface SeparateLineProps {
  isTextInclude: boolean;
  color?: string;
}

const SeparateLine: React.FC<SeparateLineProps> = ({ isTextInclude, color }) => {

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    orContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: color ?? g_THEME.colors.grey,
    },
    orText: {
      fontFamily: g_THEME.fonts.regular,
      marginHorizontal: screenWidth * 0.03,
      color: g_THEME.colors.grey,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        {isTextInclude && (
            <Text style={styles.orText}>OR</Text>
        )}
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default SeparateLine;