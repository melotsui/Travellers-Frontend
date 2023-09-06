import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import ImageTile from '../molecules/image_tile';
import IconButton from '../atoms/icon_button';
import RoundButton from '../atoms/round_button';
import GradientContainer from '../atoms/gradient_container';

interface PartnerTileProps {
    name: string;
    uri: string;
    onPress?: () => void;
    isPending: boolean;
    isSelect?: boolean;
    isAdded?: boolean;
}

const PartnerTile: React.FC<PartnerTileProps> = ({ name, uri, onPress, isPending, isSelect, isAdded }) => {

    const handleInvitePartner = () => {
        if (onPress != null) {
            onPress();
        }
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: isSelect != null ? 30 : 0,
        },
    });

    const InnerContent = () => {
        return <>
            <View style={[styles.container, g_STYLE.row]}>
                <ImageTile title={name} uri={uri}></ImageTile>
                {isPending ? <RoundButton icon={"update"} title={"Pending"} color='orange'></RoundButton> : null}
                {isSelect == null && <IconButton onPress={handleInvitePartner} icon={isAdded ? "add" : "close"} color={g_THEME.colors.grey} size={20}></IconButton>}
            </View></>
    }

    return (<>
        {isSelect ?
            <GradientContainer isLight={true}>
                <InnerContent />
            </GradientContainer>
            :
            <InnerContent />}
    </>

    );
};


export default PartnerTile;