import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import TextCustom from '../../../components/TextCustom';
import BtnCustom from '../../../components/BtnCustom';
import {Approve, Back} from '../../../constants/svg';
import colors from '../../../constants/colors';
import {height, width} from '../../../constants/orther';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {fixedNumber} from '../../../util/video';

interface SpeedToolProps {
  onBack: () => void;
  onChangeSpeed: (data: {speed: number}) => void;
  onSave: () => void;
}

const maxSpeed = 6;
const allElements = maxSpeed * 5 + 1;
const cursorSize = 20;
const speedW = width * 0.75;

const SpeedTool = ({onBack, onSave, onChangeSpeed}: SpeedToolProps) => {
  const dumpArr = new Array(allElements).fill(null);

  const xTranslate = useSharedValue((speedW / allElements) * (maxSpeed - 1));
  const xPrev = useSharedValue(0);

  const cursorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: xTranslate.value}],
    };
  });

  const cursorPan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      xPrev.value = xTranslate.value;
    })
    .onUpdate(event => {
      const range = xPrev.value + event.translationX;

      if (
        range >= speedW / allElements - cursorSize / 3 &&
        range <= speedW - cursorSize / 3
      ) {
        xTranslate.value = range;

        const currSpeed = fixedNumber(
          (xTranslate.value / speedW) * maxSpeed,
          2,
        );

        onChangeSpeed({speed: Number(currSpeed)});
      }
    })
    .runOnJS(true);

  const renderSpeed = ({_, index}: any) => {
    const isShowSpeed = index % 5 === 0;

    return (
      <View style={styles.speedContainer}>
        <TextCustom
          text={isShowSpeed ? `${index / 5}` : ''}
          fontSize={12}
          color="#838383"
        />

        <View
          style={[
            styles.col,
            {
              borderRightColor: isShowSpeed ? 'white' : '#838383',
              height: isShowSpeed ? '45%' : '35%',
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BtnCustom
        style={[styles.approveBtn, {backgroundColor: colors.gray}]}
        onEvent={onBack}>
        <Back />
      </BtnCustom>

      <View style={{marginHorizontal: '3%'}}>
        <FlatList
          data={dumpArr}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderSpeed}
          scrollEnabled={false}
          horizontal
          style={{width: speedW}}
        />

        <View style={styles.cursorContainer}>
          <GestureDetector gesture={cursorPan}>
            <Animated.View style={[styles.cursor, cursorStyle]} />
          </GestureDetector>
        </View>
      </View>

      <BtnCustom style={styles.approveBtn} onEvent={onSave}>
        <Approve />
      </BtnCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },

  speedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: speedW / allElements,
  },

  approveBtn: {
    backgroundColor: colors.purple,
    paddingHorizontal: 2,
    height: height * 0.05,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  col: {
    borderRightWidth: 1,
    marginTop: 3,
  },

  cursorContainer: {
    position: 'absolute',
    bottom: '18%',
  },

  cursor: {
    width: cursorSize,
    height: cursorSize,
    borderRadius: cursorSize / 2,
    backgroundColor: 'white',
  },
});

export default SpeedTool;
