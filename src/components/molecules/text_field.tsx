import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../atoms/container';
import IconButton from '../atoms/icon_button';

interface TextFieldProps {
    text: string;
    onChange: (value: string) => void;
    hint?: string;
    onPress?: () => void;
    suffixIcon?: string;
    error?: string;
    secure?: boolean;
    numberOfLines?: number;
}

const TextField: React.FC<TextFieldProps> = ({ text, onChange, hint, onPress, suffixIcon, error, secure, numberOfLines }) => {
    const [isSecure, setIsSecure] = useState(true);

    const handleInputChange = (text: string) => {
        onChange(text);
    };

    const handleSecureToggle = () => {
        setIsSecure(!isSecure);
    }

    const handleSuffixIcon = () => {
        if (onPress != null) {
            onPress();
        }
    }

    const styles = StyleSheet.create({
        input: {
            width: secure || suffixIcon ? '90%' : '100%',
            paddingHorizontal: screenWidth * 0.05,
            fontSize: 18,
            fontFamily: g_THEME.fonts.regular,
        },

        inputContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            fontSize: 18,
            fontFamily: g_THEME.fonts.regular,
            borderRadius: 25,
            backgroundColor: g_THEME.colors.lightBlue,
            borderColor: g_THEME.colors.lightBlue,
            borderWidth: 1,
        },
        suffix: {
            width: '10%'
        }
    });

    return (
        <View>
            <Container>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input]}
                        value={text}
                        onChangeText={handleInputChange}
                        placeholder={hint}
                        placeholderTextColor={'rgba(0, 0, 0, 0.21)'}
                        secureTextEntry={secure != null ? isSecure : false} 
                        multiline={numberOfLines != null}
                        numberOfLines={numberOfLines ?? 1} 
                    />
                    {suffixIcon != null &&
                        <View style={styles.suffix}>
                            <IconButton onPress={handleSuffixIcon} icon={suffixIcon} size={24} />
                        </View>}
                    {secure != null &&
                        <View style={styles.suffix}>
                            <TouchableOpacity onPress={handleSecureToggle}>
                                <Icon name={isSecure ? 'visibility' : 'visibility-off'} size={24} color={'grey'} />
                            </TouchableOpacity>
                        </View>}
                </View>
            </Container>
            {error != null && error.length != 0 &&
                <View style={{ paddingLeft: 15 }}>
                    <CustomText color='red' size={12}>{error}</CustomText>
                </View>}
        </View>
    );
};

export default TextField;