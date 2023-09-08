import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Touchable, View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import { ImageGallery, ImageObject } from '@georstat/react-native-image-gallery';
import CustomText from '../atoms/text';
import { Media } from '../../models/media';
import IconButton from '../atoms/icon_button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MediaMediaLocalUrl } from '../../models/media_media_local_url';

interface ImageViewerProps {
  children: React.ReactNode;
  media: MediaMediaLocalUrl[];
  onPress?: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ children, media, onPress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => {
    console.log("here");
    setIsOpen(false);
  }

  const handleEdit = () => {
    if (onPress != null) {
      onPress();
    }
  }

  const images = [
    {
      id: 1,
      url: media[0].media_local_url?.media_local_url!,
      // any other extra info you want
    },
  ];

  const renderHeaderComponent = (image: ImageObject, currentIndex: number) => {
    return <><View style={styles.back}>
      <IconButton icon={"arrow-back-ios"} color={"white"} onPress={closeGallery}></IconButton>
    </View>
      <CustomText color="white" size={30} textAlign="center">Gallery</CustomText>
      <View style={styles.headerButton}>
      <IconButton icon={"edit"} color={"white"} onPress={handleEdit}></IconButton>
    </View>
    </>;
  };

  return (<>
    <TouchableOpacity onPress={openGallery}>
      {children}
    </TouchableOpacity>
    <ImageGallery close={closeGallery} isOpen={isOpen} images={images}
      renderHeaderComponent={renderHeaderComponent} />
  </>
  );

}


const styles = StyleSheet.create({
  back: {
    width: 60,
    height: 60,
    left: 25,
    top: 15,
    position: 'absolute'
  },
  headerButton: {
    top: 15,
      right: 10,
      position: 'absolute',
  }
});

export default ImageViewer;
