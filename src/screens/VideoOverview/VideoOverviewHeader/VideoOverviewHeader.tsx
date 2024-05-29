import {StyleSheet, View} from 'react-native';
import React from 'react';
import BtnCustom from '../../../components/BtnCustom';
import {Back, Rename, Share, Threedots} from '../../../constants/svg';
import TextCustom from '../../../components/TextCustom';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import fonts from '../../../constants/fonts';
import {width} from '../../../constants/orther';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface VideoOverviewProps {
  name: string;
  onBack: () => void;
  onEdit: () => void;
  onShare: () => void;
}

const VideoOverviewHeader = ({
  name,
  onBack,
  onEdit,
  onShare,
}: VideoOverviewProps) => {
  const {top} = useSafeAreaInsets();
  const tool = useSharedValue(false);

  const toggleTool = () => {
    tool.value = withSpring(!tool.value, {duration: 333});
  };

  const toolStype = useAnimatedStyle(() => {
    return {
      opacity: interpolate(tool.value, [false, true], [0, 1]),
      pointerEvents: tool.value ? 'auto' : 'none',
    };
  });

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <BtnCustom onEvent={onBack} style={styles.btn}>
        <Back />
      </BtnCustom>

      <TextCustom
        text={name}
        color="white"
        fontFamily={fonts.ligth}
        style={styles.textName}
        lineNumber={1}
      />

      <BtnCustom onEvent={toggleTool} style={styles.btn}>
        <Threedots stroke={'#ffffff'} />

        <Animated.View style={[toolStype, styles.toolContainer]}>
          <BtnCustom style={styles.btnAction} onEvent={onEdit}>
            <Rename />

            <TextCustom text={'Edit'} style={{marginLeft: '5%'}} />
          </BtnCustom>
          <BtnCustom
            style={{...styles.btnAction, borderBottomWidth: 0}}
            onEvent={onShare}>
            <Share />

            <TextCustom text={'Share'} style={{marginLeft: '5%'}} />
          </BtnCustom>
        </Animated.View>
      </BtnCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },

  textName: {width: '66%', textAlign: 'center'},

  btn: {
    backgroundColor: '#36363650',
    padding: 4,
    borderRadius: 8,
  },

  toolContainer: {
    position: 'absolute',
    top: '160%',
    right: '5%',
    width: width * 0.33,
    backgroundColor: '#ffffff70',
    borderRadius: 10,
  },

  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8%',
    borderBottomWidth: 0.8,
    borderBottomColor: 'white',
  },
});

export default VideoOverviewHeader;
