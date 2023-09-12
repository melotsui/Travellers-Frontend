// VideoControls.tsx

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface VideoControlsProps {
  onPlayPause: () => void;
  onSliderValueChange: (value: number) => void;
  isPaused: boolean;
  currentTime: number;
  duration: number;
}

const VideoControls: React.FC<VideoControlsProps> = ({ onPlayPause, onSliderValueChange, isPaused, currentTime, duration }) => {
  const [showControls, setShowControls] = useState(true);
  const controlTimeout = useRef<NodeJS.Timeout | null>(null);

  // const toggleControls = () => {
  //   setShowControls(!showControls);
  //   if (showControls && controlTimeout.current) {
  //     clearTimeout(controlTimeout.current);
  //     controlTimeout.current = null;
  //   } else {
  //     controlTimeout.current = setTimeout(() => setShowControls(false), 2000);
  //   }
  // };

  useEffect(() => {
    return () => {
      if (controlTimeout.current) {
        clearTimeout(controlTimeout.current);
      }
    };
  }, []);

  return (
    <View>
      {showControls && (
        <View style={{ position: 'absolute', bottom: 20, left: 10, right: 10 }}>
          <Slider
            value={currentTime}
            maximumValue={duration}
            onSlidingComplete={onSliderValueChange}
            style={{ marginVertical: 10 }}
            // ... other Slider props
          />

          <TouchableOpacity 
            onPress={onPlayPause}
            style={{ alignSelf: 'center' }}
          >
            <Icon name={isPaused ? "play-arrow" : "pause"} size={30} />
            {/* You can replace Text with Icon component */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default VideoControls;
