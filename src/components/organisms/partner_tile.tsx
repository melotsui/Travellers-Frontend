import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import g_STYLE from '../../styles/styles';
import g_THEME from '../../theme/theme';
import ImageTile from '../molecules/image_tile';
import IconButton from '../atoms/icon_button';
import RoundButton from '../atoms/round_button';
import GradientContainer from '../atoms/gradient_container';
import CustomText from '../atoms/text';
import GradientPopupDialog from '../molecules/gradient_dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PartnerTileProps {
    name: string;
    uri?: string;
    onPress?: () => void;
    isPending: boolean;
    isSelect?: boolean;
    isAdded?: boolean;
    isInvited?: boolean;
    noSuffix?: boolean;
}

const PartnerTile: React.FC<PartnerTileProps> = ({ name, uri, onPress, isPending, isSelect, isAdded, isInvited, noSuffix }) => {

    const handlePartner = () => {
        if (onPress != null) {
            onPress();
        }
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: isSelect ? 30 : 0,
        },
        text: {
            marginHorizontal: 20,
        },
    });

    const InnerContent = () => {
        return <>
            <View style={[styles.container, g_STYLE.row]}>
                <View style={{ flex: 1 }}><ImageTile title={name} uri={uri} size={16}></ImageTile></View>
                {isPending ? <RoundButton icon={"update"} title={"Pending"} color='orange'></RoundButton> : null}
                {noSuffix ? null :
                    isSelect == null && isAdded ? <GradientPopupDialog isSelect={true} title="Reminder" onPress={handlePartner}>
                        {[
                            <Icon name={"close"} color={g_THEME.colors.grey} size={20} key={0}></Icon>,
                            <CustomText size={20} key={1}>Are you sure to delete this partner? This user cannot see the trip anymore. </CustomText>
                        ]}
                    </GradientPopupDialog>
                        : <IconButton onPress={handlePartner} icon={isInvited || isSelect ? "close" : "add"} color={g_THEME.colors.grey} size={20}></IconButton>}
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