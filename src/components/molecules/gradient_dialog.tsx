import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import GradientContainer from '../atoms/gradient_container';
import { Dialog, Menu, Portal } from 'react-native-paper';
import IconButton from '../atoms/icon_button';
import CustomText from '../atoms/text';
import GradientButton from './gradient_button';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import RoundButton from '../atoms/round_button';
import g_THEME from '../../theme/theme';
import g_STYLE from '../../styles/styles';

interface GradientPopupDialogProps {
    children: React.ReactNode[];
    isSelect: boolean;
    title: string;
    onPress: () => void;
}

const GradientPopupDialog: React.FC<GradientPopupDialogProps> = ({ children, isSelect, title, onPress }) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleConfirm = () => {
        onPress();
        hideDialog();
    }

    return (
        <View>
            <TouchableOpacity onPress={showDialog}>
                {children[0]}
            </TouchableOpacity>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={hideDialog}>
                    <GradientContainer>
                        <View style={styles.whiteContainer}>
                            <Dialog.Title>
                                <CustomText>{title}</CustomText>
                            </Dialog.Title>
                            <Dialog.Content>
                                {children[1]}
                            </Dialog.Content>
                            <Dialog.Actions>
                                <GradientButton size={20} width={0.25} title={"Confirm"} onPress={handleConfirm}></GradientButton>
                                {isSelect ?
                                    <View>
                                        <GradientButton size={20} width={0.25} title={"Cancel"} onPress={hideDialog} color={g_THEME.colors.grey}></GradientButton>
                                    </View> : null
                                }
                            </Dialog.Actions>
                        </View>
                    </GradientContainer>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    dialogContainer: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderRadius: 15,
        marginHorizontal: 40,
    },
    whiteContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default GradientPopupDialog;