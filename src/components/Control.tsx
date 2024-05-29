import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import BtnCustom from './BtnCustom';
import {Mute, Pause, Resume, Unmute} from '../constants/svg';
import {durationToTime} from '../util/video';
import TextCustom from './TextCustom';
import {width} from '../constants/orther';

interface ControlProps {
  isPause: boolean;
  isMute: boolean;
  currTime: number;
  duration: number;
  onToggleSound: () => void;
  onToggleVideo: () => void;
  style?: ViewStyle;
}

const Control = ({
  isMute,
  isPause,
  currTime,
  duration,
  style,
  onToggleSound,
  onToggleVideo,
}: ControlProps) => {
  const present = durationToTime(currTime);
  const all = durationToTime(duration);

  return (
    <View style={[styles.container, style]}>
      <BtnCustom onEvent={onToggleVideo} style={styles.mgStyle}>
        {isPause ? <Pause fill={'#ffffff'} /> : <Resume fill={'#ffffff'} />}
      </BtnCustom>

      <BtnCustom onEvent={onToggleSound} style={styles.mgStyle}>
        {isMute ? <Mute /> : <Unmute />}
      </BtnCustom>

      <TextCustom
        text={`${present.minutes}:${present.seconds}/`}
        color="white"
      />

      <TextCustom text={`${all.minutes}:${all.seconds}`} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mgStyle: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Control;
