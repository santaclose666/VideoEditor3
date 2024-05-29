import React, {LegacyRef, forwardRef} from 'react';
import {ViewStyle} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

interface VideoViewProps {
  uri: string;
  isPause: boolean;
  mute?: boolean;
  onLoad?: (data: any) => void;
  onProgess?: (data: any) => void;
  style?: ViewStyle;
}

const VideoView = (
  {uri, isPause, mute = true, style, onLoad, onProgess}: VideoViewProps,
  ref: LegacyRef<VideoRef>,
) => {
  return (
    <Video
      ref={ref}
      source={{uri}}
      paused={isPause}
      muted={mute}
      repeat={true}
      style={style}
      onLoad={onLoad}
      onProgress={onProgess}
      resizeMode="contain"
    />
  );
};

export default forwardRef(VideoView);
