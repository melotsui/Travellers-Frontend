import React, { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Touchable, View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import { ImageGallery, ImageObject } from '@georstat/react-native-image-gallery';
import CustomText from '../atoms/text';
import { Media } from '../../models/media';
import IconButton from '../atoms/icon_button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MediaMediaLocalUrl } from '../../models/media_media_local_url';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import VideoControls from '../molecules/custom_control';

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
      setIsOpen(false);
    }
  }

  const images = [
    {
      id: 1,
      url: media[0].media_local_url?.media_local_url!,
      // any other extra info you want
    },
  ];

  const [isPaused, setIsPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<Video>(null);

  function renderMedia() {
    if (media[0].media?.media_type == 'video') {
      return (
        <View style={{ flex: 1 }}>
          <Video
            ref={videoRef}
            source={{ uri: media[0].media_local_url?.media_local_url! }}
            style={{ flex: 1 }}
            resizeMode="contain"
            repeat={true}
            paused={isPaused}
            onProgress={(data) => setCurrentTime(data.currentTime)}
            onLoad={(data) => { 
              setDuration(data.duration);
              setCurrentTime(data.currentTime);
            }} />
            
          <VideoControls
            onPlayPause={() => setIsPaused(!isPaused)}
            onSliderValueChange={(value) => {
              console.log(value);
              videoRef.current?.seek(value);
            }} // Assuming you have ref to your Video component
            isPaused={isPaused}
            currentTime={currentTime}
            duration={duration}
          /></View>
      );
    } else {
      return <Image source={{ uri: media[0].media_local_url?.media_local_url! }} style={{ flex: 1 }} />;
    }
  }

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
      renderHeaderComponent={renderHeaderComponent}
      renderCustomImage={renderMedia}
      hideThumbs
    />
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
  },
});

export default ImageViewer;
