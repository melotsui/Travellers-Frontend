import { StyleSheet } from 'react-native';
import g_THEME from '../theme/theme';

const g_STYLE = StyleSheet.create({
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    textFieldContainer: {
        backgroundColor: 'white',
        borderRadius: 25,
    },
    textFieldShadowProp: {
        shadowColor: g_THEME.colors.shadowBlue,
        elevation: 10,
    },
  });

  export default g_STYLE;