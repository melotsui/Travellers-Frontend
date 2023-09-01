import React from 'react';
import { StyleSheet, View } from 'react-native';
import GradientContainer from '../atoms/gradient_container';
import { Menu } from 'react-native-paper';
import IconButton from '../atoms/icon_button';

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