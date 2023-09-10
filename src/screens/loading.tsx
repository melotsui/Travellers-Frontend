import { StyleSheet, View, Image } from 'react-native';
import React from 'react'
import { screenWidth } from '../constants/screen_dimension';


const LoadingScreen: React.FC = (props) => {
    
    return (
            <View style={[styles.container, { flex: 1, }]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
    );


};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
    },
});

export default LoadingScreen;
