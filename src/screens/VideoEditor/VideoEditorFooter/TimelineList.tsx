import {FlatList, Image, StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo, useCallback} from 'react';
import {base64Img, timeline} from '../../../constants/orther';
import Animated, {
  AnimatedStyleProp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import colors from '../../../constants/colors';
import {videoTrim} from '../../../types';
import TextCustom from '../../../components/TextCustom';

interface TimelineListProps {
  currInfo: videoTrim;
  timelineData: string[];
  duration: number;
  isToolOpen: boolean;
  onUpdateTime: (data: videoTrim) => void;
}

const {wide, framesPerSec} = timeline;

const TimelineList = ({
  currInfo,
  timelineData,
  duration,
  isToolOpen = false,
  onUpdateTime,
}: TimelineListProps) => {
  const sliderRange = duration * wide;
  const {startTime, endTime, speed} = currInfo;

  const widthPrev = useSharedValue(0);
  const xPrev = useSharedValue(0);
  const widthInit = useDerivedValue(() => {
    return withTiming(wide * (endTime - startTime), {duration: 300});
  }, [endTime, startTime]);

  const xTranslate = useDerivedValue(() => {
    return withTiming(wide * startTime, {duration: 300});
  }, [startTime]);

  const handlePanderEnd = () => {
    const start = xTranslate.value / wide;
    const end = (xTranslate.value + widthInit.value) / wide;

    onUpdateTime({startTime: start, endTime: end});
  };

  const sliderStyle = useAnimatedStyle((): AnimatedStyleProp<ViewStyle> => {
    return {
      width: widthInit.value,
      transform: [{translateX: xTranslate.value}],
    };
  }, [currInfo]);

  const panCore = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      xPrev.value = xTranslate.value;
    })
    .onUpdate(event => {
      const maxRange = sliderRange - widthInit.value;

      const currTranslate = xPrev.value + event.translationX;

      if (currTranslate >= 0 && currTranslate <= maxRange) {
        xTranslate.value = currTranslate;
      }
    })
    .onEnd(handlePanderEnd)
    .runOnJS(true);

  const panLeft = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      xPrev.value = xTranslate.value;
      widthPrev.value = widthInit.value;
    })
    .onUpdate(event => {
      const leftTranslate = xPrev.value + event.translationX;
      const newWidth = widthPrev.value - event.translationX;

      if (leftTranslate >= 0 && newWidth >= wide) {
        xTranslate.value = leftTranslate;
        widthInit.value = newWidth;
      }
    })
    .onEnd(handlePanderEnd)
    .runOnJS(true);

  const panRight = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      widthPrev.value = widthInit.value;
    })
    .onUpdate(event => {
      const newWidth = widthPrev.value + event.translationX;

      if (newWidth + xTranslate.value <= sliderRange && newWidth >= wide) {
        widthInit.value = newWidth;
      }
    })
    .onEnd(handlePanderEnd)
    .runOnJS(true);

  const renderTimeline = useCallback(({item}: any) => {
    return <Image source={{uri: base64Img + item}} style={styles.img} />;
  }, []);

  return (
    <View>
      <FlatList
        data={timelineData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderTimeline}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{borderRadius: 12}}
      />

      <View
        style={[
          styles.trimSliderContainer,
          {
            borderWidth: isToolOpen ? 0 : 2,
            borderColor: isToolOpen ? 'transparent' : colors.purple,
          },
        ]}>
        {isToolOpen && (
          <GestureDetector gesture={panCore}>
            <Animated.View style={[styles.trimSlider, sliderStyle]}>
              <GestureDetector gesture={panLeft}>
                <Animated.View style={styles.leftPander}>
                  <View style={styles.whiteCol} />
                </Animated.View>
              </GestureDetector>

              <GestureDetector gesture={panRight}>
                <Animated.View style={[styles.rightPander]}>
                  <View style={styles.whiteCol} />
                </Animated.View>
              </GestureDetector>

              <TextCustom
                text={`${speed}x`}
                color="white"
                fontSize={15}
                style={styles.speedText}
              />
            </Animated.View>
          </GestureDetector>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: wide / framesPerSec,
    aspectRatio: 1 / 2,
  },

  trimSliderContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },

  trimSlider: {
    height: '100%',
    borderWidth: 3,
    borderColor: colors.purple,
    borderRadius: 12,
    justifyContent: 'center',
  },

  leftPander: {
    position: 'absolute',
    left: -9,
    padding: 6,
    backgroundColor: colors.purple,
    borderRadius: 6,
  },

  rightPander: {
    position: 'absolute',
    right: -9,
    padding: 6,
    backgroundColor: colors.purple,
    borderRadius: 6,
  },

  whiteCol: {
    height: wide / 2,
    borderWidth: 1,
    borderColor: 'white',
  },

  speedText: {
    position: 'absolute',
    left: 6,
    top: 3,
  },
});

export default memo(TimelineList);
