import {View, ViewStyle} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import images from '../constants/images';

interface ProgessProps {
  currTime: number;
  duration: number;
  style?: ViewStyle;
  onSliderChange: (i: number) => void;
}

const Progess = ({currTime, duration, style, onSliderChange}: ProgessProps) => {
  return (
    <View style={style}>
      <Slider
        value={currTime}
        step={0.1}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#5b5b5b"
        onValueChange={onSliderChange}
        thumbImage={images.thumb}
      />
    </View>
  );
};

export default Progess;
