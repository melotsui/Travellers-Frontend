import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../atoms/container';
import IconButton from '../atoms/icon_button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TextFieldProps {
    text: string;
    onChange?: (value: string) => void;
    hint?: string;
    onPress?: () => void;
    onPressText?: () => void;
    suffixIcon?: string;
    prefixIcon?: string;
    error?: string;
    secure?: boolean;
    numberOfLines?: number;
    suffixIconColor?: string;
}

const TextField: React.FC<TextFieldProps> = ({ text, onChange, hint, onPress, onPressText, suffixIcon, prefixIcon, error, secure, numberOfLines, suffixIconColor }) => {
    const [isSecure, setIsSecure] = useState(true);

    const handleInputChange = (text: string) => {
        if (onChange != null) {
            onChange(text);
        }
    };

    const handleSecureToggle = () => {
        setIsSecure(!isSecure);
    }

    const handleSuffixIcon = () => {
        if (onPress != null) {
            onPress();
        }
    }

    const handleText = () => {
        if (onPressText != null) {
            onPressText();
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
            fontSize: 18,
            fontFamily: g_THEME.fonts.regular,
            borderRadius: 25,
            backgroundColor: g_THEME.colors.lightBlue,
            borderColor: g_THEME.colors.lightBlue,
            borderWidth: 1,
            paddingLeft: prefixIcon ? 15 : 0,
        },
        prefix: {
            justifyContent: 'center',
        },
        suffix: {
            width: '10%',
            justifyContent: 'center',
        },
        suffixRightBottom: {
            position: 'absolute',
            right: 15,
            bottom: 15,
        }
    });

    return (
        <View>
            <Container>
                <TouchableOpacity onPress={handleText}>
                    <View style={styles.inputContainer}>
                        {prefixIcon != null &&
                            <View style={styles.prefix}>
                                <MaterialIcons onPress={handleSuffixIcon} name={prefixIcon} color={'black'} size={24} />
                            </View>}
                        <TextInput
                            style={[styles.input]}
                            value={text}
                            onChangeText={handleInputChange}
                            placeholder={hint}
                            placeholderTextColor={'rgba(0, 0, 0, 0.21)'}
                            secureTextEntry={secure != null ? isSecure : false}
                            multiline={numberOfLines != null}
                            numberOfLines={numberOfLines ?? 1}
                            editable={onPressText == null}
                            
                        />
                        {suffixIcon != null &&
                            <View style={numberOfLines != null ? styles.suffixRightBottom : styles.suffix}>
                                <IconButton onPress={handleSuffixIcon} icon={suffixIcon} color={suffixIconColor} size={24} />
                            </View>}
                        {secure != null &&
                            <View style={styles.suffix}>
                                <TouchableOpacity onPress={handleSecureToggle}>
                                    <Icon name={isSecure ? 'visibility' : 'visibility-off'} size={24} color={'grey'} />
                                </TouchableOpacity>
                            </View>}
                    </View>
                </TouchableOpacity>
            </Container>
            {error != null && error.length != 0 &&
                <View style={{ paddingLeft: 15 }}>
                    <CustomText color='red' size={12}>{error}</CustomText>
                </View>}
        </View>
    );
};

export default TextField;