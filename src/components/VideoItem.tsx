import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {MediaProps} from '../types';
import {base64Img, width} from '../constants/orther';
import BtnCustom from './BtnCustom';
import {Approve, Threedots} from '../constants/svg';
import TextCustom from './TextCustom';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import {durationToTime} from '../util/video';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface VideoItemProps {
  item: MediaProps;
  index: number;
  listSelected?: number[];
  toggleSelect?: boolean;
  onPressItem: (item: MediaProps) => void;
  onMorePress: (item: MediaProps) => void;
  onSelectVideo?: (idx: number) => void;
}

const videoW = width * 0.29;
const selectSize = width * 0.07;

const VideoItem = ({
  item,
  index,
  toggleSelect = false,
  listSelected,
  onMorePress,
  onPressItem,
  onSelectVideo,
}: VideoItemProps) => {
  const {name, thumbnail, dateCreated, duration, size} = item;
  const isPicker = listSelected?.includes(index);
  const toggle = useSharedValue(false);
  const {minutes, seconds} = durationToTime(duration);

  useEffect(() => {
    if (toggle.value !== toggleSelect) {
      toggle.value = withTiming(!toggle.value, {duration: 345});
    }
  }, [toggleSelect]);

  const checkBoxStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(toggle.value, [false, true], [0, width * 0.12]),
      opacity: interpolate(toggle.value, [false, true], [0, 1]),
    };
  });

  return (
    <Pressable
      style={styles.videoContainer}
      onPress={() => {
        onPressItem(item);
      }}>
      <Animated.View style={[checkBoxStyle, styles.checkboxContainer]}>
        <BtnCustom
          style={{...styles.checkbox, borderWidth: isPicker ? 0 : 2}}
          onEvent={() => {
            onSelectVideo(index);
          }}>
          {isPicker && (
            <View style={styles.checkboxIcon}>
              <Approve />
            </View>
          )}
        </BtnCustom>
      </Animated.View>

      <Image source={{uri: base64Img + thumbnail}} style={styles.img} />

      <View style={styles.videoInfoContainer}>
        <TextCustom text={name} lineNumber={1} style={{width: '80%'}} />

        <View style={styles.infoContainer}>
          <TextCustom text={dateCreated} style={styles.textInfo} />
          <View style={styles.separate} />
          <TextCustom text={`${minutes}:${seconds}`} style={styles.textInfo} />
          <View style={styles.separate} />
          <TextCustom text={`${size}M`} style={styles.textInfo} />
        </View>
      </View>

      <BtnCustom
        onEvent={() => {
          onMorePress(item);
        }}>
        <Threedots stroke={'#363636'} />
      </BtnCustom>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },

  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkbox: {
    width: selectSize,
    height: selectSize,
    borderRadius: 50,
  },

  checkboxIcon: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: videoW,
    aspectRatio: 4 / 2.7,
    borderRadius: 5,
  },

  videoInfoContainer: {
    flexShrink: 1,
    marginLeft: '3%',
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
  },

  textInfo: {
    fontFamily: fonts.ligth,
    fontSize: 15,
    color: colors.gray,
  },

  separate: {
    borderRightWidth: 0.8,
    borderRightColor: colors.gray,
    height: '120%',
    marginHorizontal: '4%',
  },
});

export default VideoItem;
