import { Asset, ImagePickerResponse, MediaType, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Media } from "../models/media";
import { MediaTypes } from "../constants/types";

const openCamera = (type: MediaType): Promise<Asset[]> => {
    return new Promise((resolve, reject) => {
        launchCamera(
            {
                mediaType: type,
                videoQuality: 'medium',
                durationLimit: 60,
                quality: 0.5,
                maxWidth: 1000,
                maxHeight: 1000,
            },
            (response: ImagePickerResponse) => {
                if (!response.didCancel) {
                    console.log('openCamera', response.assets);
                    resolve(response.assets || []);
                } else {
                    reject(new Error('Camera canceled'));
                }
            }
        );
    });
};
const openGallery = (): Promise<Asset[]> => {
    return new Promise((resolve, reject) => {
        launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
            maxHeight: 1000,
            quality: 0.8,
        }, (response: ImagePickerResponse) => {
            console.log(response.assets);
            if (!response.didCancel) {
                resolve(response.assets || []);
            } else {
                reject(new Error('Gallery canceled'));
            }
        }
        );
    });
};

export { openCamera, openGallery };