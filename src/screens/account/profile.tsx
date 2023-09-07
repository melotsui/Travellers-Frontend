import React, { ReactNode, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import g_STYLE from "../../styles/styles";
import CustomText from "../../components/atoms/text";
import GradientButton from "../../components/molecules/gradient_button";
import CustomHeader from "../../components/molecules/header";
import TextField from "../../components/molecules/text_field";
import CircularImage from "../../components/atoms/circular_image";
import { screenWidth } from "../../constants/screen_dimension";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import g_THEME from "../../theme/theme";
import GradientPopupDialog from "../../components/molecules/gradient_dialog";
import { PaperProvider } from "react-native-paper";
import { RootProps } from "../../navigation/screen_navigation_props";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../utils/validation";
import { useBottomSheet } from "../../context/bottom_sheet_context";
import SeparateLine from "../../components/atoms/separate_line";
import BottomSheetTile from "../../components/organisms/bottom_sheet_tile";
import apis from "../../api/api_service";
import IconButton from "../../components/atoms/icon_button";
import { Asset } from "react-native-image-picker";
import { openCamera, openGallery } from "../../utils/image_picker";
import { RootState } from "../../slices/root_reducers";
import { DispatchThunk } from "../../store/store";
import { userSelector } from "../../slices/user_slice";
import { fetchUser, updateUser } from "../../actions/user_actions";
import { formatGender } from "../../helpers/gender";

const ProfileScreen: React.FC<RootProps<'Profile'>> = (props) => {
    const { user, loading, error } = useSelector(userSelector);
    const dispatch: DispatchThunk = useDispatch();
    const [icon, setIcon] = useState<Asset | null>(null);
    const [username, setUsername] = useState(user?.username ?? '');
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '')
    const [nationality, setNationality] = useState(user?.nationality ?? '');
    const [gender, setGender] = useState(user?.gender ?? '');
    const [age, setAge] = useState(user?.age ?? 0);
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [seconds, setSeconds] = useState(0);
    let isVerify = false;

    useEffect(() => {

        dispatch(fetchUser());

        return () => {

        }
    }, []);

    useEffect(() => {
        setEmail(user?.email ?? '');
    }, [user]);

    const {setBottomSheetContent, showBottomSheet, hideBottomSheet} = useBottomSheet();

    const content = () : ReactNode => {
        return <>
        <BottomSheetTile onPress={() => handleGender("Male")}>Male</BottomSheetTile>
        <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>
        <BottomSheetTile onPress={() => handleGender("Female")}>Female</BottomSheetTile>
        </>
    }
    
    useEffect(() => {
        if (seconds > 0) {
          const timerId = setTimeout(() => {
            setSeconds(seconds - 1);
            setEmailError(`Can be re-sent in ${seconds} seconds`);
          }, 1000);
    
          // Cleanup timer on unmount or when seconds change
          return () => clearTimeout(timerId);
        }else{
            setEmailError('');
        }
      }, [seconds]);

      const iconContent = (): ReactNode => {
        return <>
            <BottomSheetTile onPress={handleTakePhoto} key={0}>Take Photo</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>
            <BottomSheetTile onPress={handleGallery} key={1}>Select from Gallery</BottomSheetTile>
            <SeparateLine isTextInclude={false} color={g_THEME.colors.primary}></SeparateLine>
            <BottomSheetTile onPress={handlePhotoDelete} color={g_THEME.colors.error} key={2}>Delete Photo</BottomSheetTile>
        </>
    }

    const handleTakePhoto = async () => {
        const media : Asset[] = await openCamera();
        setIcon(media[0]);
    }

    const handleGallery = async () => {
        const media : Asset[] = await openGallery();
        setIcon(media[0]);
    }

    const handlePhotoDelete = () => {
    }

    const handleIcon = () => {
        setBottomSheetContent(iconContent());
        showBottomSheet();
    }


    const handleName = (value: string) => {
        setName(value);
    }

    const handleEmail = () => {
        props.navigation.navigate('PersonalInformation');
    }

    const handleEmailVerification = async () => {
         if (seconds > 0) {
            return;
        }
        console.log(email);
        await apis.user.sendVerifyEmail(email)
        .then((response) => {
            console.log(response);
            setSeconds(20);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleNationality = (value: string) => {
        setNationality(value);
    }

    const handleGenderPress = () => {
        setBottomSheetContent(content());
        showBottomSheet();
    }

    const handleGender = (value: string) => {
        setGender(value);
        hideBottomSheet();
    }

    const handleAge = (value: string) => {
        setAgeError('');
        setAge(parseInt(value));
    }

    const handleChangePassword = () => {
        props.navigation.navigate('ChangePassword');
    }

    const handleSave = () => {
        if(age < 0 || age > 150) {
            setAgeError('Invalid age');
            return;
        }
        
        dispatch(updateUser(username, name, nationality, formatGender(gender), age, icon ?? undefined));
    }

    return (
        <PaperProvider>
            <CustomHeader title="Profile"></CustomHeader>
            <ScrollView>
                <View style={[styles.container, g_STYLE.col]}>
                    <View style={styles.image}>
                        <CircularImage size={screenWidth * 0.35} uri={icon?.uri ?? user?.user_icon_url ??'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'} />
                        
                        <View style={styles.iconButton}>
                                <IconButton icon={"add-a-photo"} size={40} color={'white'} onPress={handleIcon} ></IconButton>
                            </View>
                    </View>

                    <CustomText size={20}>Username*</CustomText>
                    <TextField text={username} onChange={handleName}></TextField>
                    <View style={styles.space}></View>

                    <CustomText size={20}>Name</CustomText>
                    <TextField text={name} onChange={handleName}></TextField>
                    <View style={styles.space}></View>

                     <View style={g_STYLE.row}>
                        <CustomText size={20}>Email</CustomText>
                        <View style={styles.horizontalSpace}></View>
                        {user?.email_verified_at ?
                            <MaterialIcons name={"check-circle-outline"} size={20} color={'green'} /> :
                            <MaterialIcons name={"error-outline"} size={20} color={g_THEME.colors.error} />}
                    </View>
                    <View style={g_STYLE.row}>
                        <View style={styles.verifyButton}>
                            <TextField text={email} error={emailError} onPressText={user?.email_verified_at ? () => {} : handleEmail}></TextField>
                        </View>
                        {/* <GradientPopupDialog isSelect={false} title="Reminder" onOpenPress={handleEmailVerification} isDisabled = {seconds > 0}>
                            {[
                                <GradientButton title={"Verify"} color={seconds > 0 ? g_THEME.colors.grey : undefined} width={0.2} size={20}></GradientButton>,
                                <CustomText size={20}>Verification link is sent to your email</CustomText>
                            ]}
                        </GradientPopupDialog> */}
                    </View>
                    <View style={styles.space}></View> 

                    <CustomText size={20}>Nationality</CustomText>
                    <TextField text={nationality} onChange={handleNationality}></TextField>
                    <View style={styles.space}></View>

                    <View style={[styles.ageGenderContainer, g_STYLE.row]}>
                        <View style={[styles.ageGender, g_STYLE.col]}>
                            <CustomText size={20}>Gender</CustomText>
                            <TextField text={gender} onPressText={handleGenderPress} />
                        </View>
                        <View style={[styles.ageGender, g_STYLE.col]}>
                            <CustomText size={20}>Age</CustomText>
                            <TextField text={age.toString() == 'NaN' ? "" : age.toString()} error={ageError} keyboardType="numeric" onChange={handleAge} />
                        </View>
                    </View>
                    <View style={styles.space}></View>

                    <View style={styles.buttons}>
                        <GradientButton title={"Change Password"} onPress={handleChangePassword} width={0.7}></GradientButton>
                        <GradientButton title={"Save"} onPress={handleSave} width={0.7}></GradientButton>
                    </View>
                </View >
            </ScrollView >
        </PaperProvider >
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        alignContent: 'center',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        color: 'white',
    },
    horizontalSpace: {
        width: 5,
    },
    space: {
        height: 10,
    },
    verifyButton: {
        flex: 1
    },
    ageGenderContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ageGender: {
        marginRight: 10,
        width: '40%',
    },
    buttons: {
        alignItems: 'center',
        marginVertical: 60,
    }
});

export default ProfileScreen;