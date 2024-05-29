import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import React, {useRef, useState} from 'react';
import VideoView from './VideoView';
import Progess from './Progess';
import Control from './Control';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface VideoPlayerProps {
  uri: string;
  videoPlayerStyle?: ViewStyle;
  videoStyle?: ViewStyle;
  controlStyle?: ViewStyle;
  progressStyle?: ViewStyle;
}

const VideoPlayer = ({
  uri,
  videoPlayerStyle,
  videoStyle,
  controlStyle,
  progressStyle,
}: VideoPlayerProps) => {
  const {bottom} = useSafeAreaInsets();

  const videoRef = useRef(null);

  const [isPause, setIsPause] = useState(false);
  const [mute, setMute] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleLoad = (data: any) => {
    setDuration(data.duration);
  };

  const handleProgress = (data: any) => {
    setCurrTime(data.currentTime);
  };

  const handleToggleVideo = () => {
    setIsPause(!isPause);
  };

  const handleToggleSound = () => {
    setMute(!mute);
  };

  const handleSlider = (data: any) => {
    videoRef.current?.seek(data);
  };

  return (
    <Pressable style={videoPlayerStyle} onPress={handleToggleVideo}>
      <VideoView
        ref={videoRef}
        uri={uri}
        isPause={isPause}
        mute={mute}
        onLoad={handleLoad}
        onProgess={handleProgress}
        style={videoStyle}
      />

      <View style={[styles.bottomContainer, {bottom: bottom}]}>
        <Progess
          currTime={currTime}
          duration={duration}
          onSliderChange={handleSlider}
          style={progressStyle}
        />

        <Control
          isPause={isPause}
          isMute={mute}
          currTime={currTime}
          duration={duration}
          onToggleSound={handleToggleSound}
          onToggleVideo={handleToggleVideo}
          style={controlStyle}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
  },
});

export default VideoPlayer;
