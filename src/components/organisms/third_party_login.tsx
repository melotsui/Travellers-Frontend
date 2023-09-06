import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react'
import { screenWidth } from '../../constants/screen_dimension';
import g_STYLE from '../../styles/styles';

const ThirdPartyLogin: React.FC = () => {

    const handleGoogleButtonPress = () => {
        console.log('Google Login');
    };

    const handleAppleButtonPress = () => {
        console.log('Apple Login');
    };

    const handleFaceBookButtonPress = () => {
        console.log('FaceBook Login');
    };
    return (
        <View style={g_STYLE.row}>
            <TouchableOpacity onPress={handleGoogleButtonPress}>
                <Image
                    source={require('../../assets/google_logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAppleButtonPress}>
                <Image
                    source={require('../../assets/apple_logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFaceBookButtonPress}>
                <Image
                    source={require('../../assets/facebook_logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: screenWidth * 0.1,
        height: screenWidth * 0.1,
        marginHorizontal: screenWidth * 0.01,
    },
  
    
});

export default ThirdPartyLogin;
