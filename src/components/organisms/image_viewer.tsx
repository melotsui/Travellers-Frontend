import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ImageGallery, ImageObject } from '@georstat/react-native-image-gallery';
import CustomText from '../atoms/text';
import IconButton from '../atoms/icon_button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MediaMediaLocalUrl } from '../../models/media_media_local_url';
import Video from 'react-native-video';
import VideoControls from '../molecules/custom_control';
import { MediaTypes } from '../../constants/types';
import { navigate } from '../../navigation/navigation_service';

interface ImageViewerProps {
  children: React.ReactNode;
  media: MediaMediaLocalUrl[];
  schedule_id: number;
  index: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ children, media, schedule_id, index }) => {

  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => {
    console.log("here");
    setIsOpen(false);
  }

  const handleEditMedia = (media: MediaMediaLocalUrl) => {
    if (media.media?.media_type == MediaTypes.AUDIO) {
        navigate('TextAudio', { schedule_id: null, note_id: null, audio: media, content: null });
    } else {
        navigate('Media', { schedule_id: schedule_id, note_id: null, media: media });
    }
    setIsOpen(false);
}
  // const handleEdit = () => {
  //   if (onPress != null) {
  //     onPress();
  //     setIsOpen(false);
  //   }
  // }

  const imagesList = media.map((media) => { return {id: media.media?.media_id, url: media.media_local_url?.media_local_url!, mediaType: media.media?.media_type!}});

  const [isPaused, setIsPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<Video>(null);

  function renderMedia(media: ImageObject, currentIndex: number) {
    if (imagesList[currentIndex].mediaType == 'video') {
      return (
        <View style={{ flex: 1 }}>
          <Video
            ref={videoRef}
            source={{ uri: media.url! }}
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
    // } else if (imagesList[currentIndex].mediaType == 'audio') {
    } else {
      return <Image source={{ uri: media.url }} style={{ flex: 1 }} />;
    }
  }

  const renderHeaderComponent = (image: ImageObject, currentIndex: number) => {
    return <><View style={styles.back}>
      <IconButton icon={"arrow-back-ios"} color={"white"} onPress={closeGallery}></IconButton>
    </View>
      <CustomText color="white" size={30} textAlign="center">Gallery</CustomText>
      <View style={styles.headerButton}>
        <IconButton icon={"edit"} color={"white"} onPress={() => handleEditMedia(media[currentIndex])}></IconButton>
      </View>
    </>;
  };

  return (<>
    <TouchableOpacity onPress={openGallery}>
      {children}
    </TouchableOpacity>
    <ImageGallery close={closeGallery} isOpen={isOpen} images={imagesList}
      initialIndex={index}
      renderHeaderComponent={renderHeaderComponent}
      renderCustomImage={renderMedia}
      //hideThumbs
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
