import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Button, Alert } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import GradientContainer from '../atoms/gradient_container';
import { PaperProvider, Divider, Menu, Provider, DefaultTheme } from 'react-native-paper';
import GradientButton from './gradient_button';
import IconButton from '../atoms/icon_button';
import CustomMenuItem from '../atoms/custom_menu_item';

interface GradientPopupMenuProps {
    children: React.ReactNode;
}

const GradientPopupMenu: React.FC<GradientPopupMenuProps> = ({children}) => {

    const [menuVisible, setMenuVisible] = React.useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
                <IconButton onPress={openMenu} icon={"more-horiz"} />}
            contentStyle={styles.menuContainer}
            style={styles.menuTop}
        >
            <View style={styles.menuGradient}>
                <GradientContainer>
                    {children}
                </GradientContainer>
            </View>
        </Menu>
    );
};



const styles = StyleSheet.create({
    menuTop: {
        paddingTop: 40,
    },
    menuContainer: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
    },
    menuGradient: {
        overflow: 'hidden',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});
export default GradientPopupMenu;