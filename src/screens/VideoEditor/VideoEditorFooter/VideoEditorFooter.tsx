import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import TextCustom from '../../../components/TextCustom';
import {durationToTime} from '../../../util/video';
import BtnCustom from '../../../components/BtnCustom';
import {Pause, Resume, Speed, Trim} from '../../../constants/svg';
import colors from '../../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TrimTool from './TrimTool';
import {height, width} from '../../../constants/orther';
import SecondsDurationList from './SecondsDurationList';
import TimelineList from './TimelineList';
import SpeedTool from './SpeedTool';
import {videoTrim as videoTrimProps, mode} from '../../../types';

interface VideoEditorFooterProps {
  isPause: boolean;
  currTime: number;
  duration: number;
  timeline: string[];
  videoTrim: videoTrimProps;
  currMode: mode;
  onToggleVideo: () => void;
  onChangeMode: (m: mode) => void;
  onUpdateInfo: (data: videoTrimProps) => void;
  onRemove: () => void;
  onSave: () => void;
}

const VideoEditorFooter = ({
  isPause,
  currTime,
  duration,
  timeline,
  videoTrim,
  currMode,
  onToggleVideo,
  onChangeMode,
  onUpdateInfo,
  onRemove,
  onSave,
}: VideoEditorFooterProps) => {
  const {bottom} = useSafeAreaInsets();
  const presentTime = durationToTime(currTime);
  const allTime = durationToTime(duration);

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <View style={styles.toolContainer}>
        <View style={styles.timeContainer}>
          <TextCustom
            text={`${presentTime.minutes}:${presentTime.seconds}/`}
            color="white"
          />
          <TextCustom
            text={`${allTime.minutes}:${allTime.seconds}`}
            color={colors.gray}
            style={{marginLeft: '2%'}}
          />
        </View>

        <View
          style={[
            styles.timeContainer,
            {width: '30%', justifyContent: 'space-between'},
          ]}>
          <BtnCustom
            style={styles.toolBtn}
            onEvent={() => {
              onChangeMode('speed');
            }}>
            <Speed fill={currMode === 'speed' ? colors.purple : '#838383'} />
          </BtnCustom>
          <BtnCustom
            style={styles.toolBtn}
            onEvent={() => {
              onChangeMode('trim');
            }}>
            <Trim fill={currMode === 'trim' ? colors.purple : '#838383'} />
          </BtnCustom>
          <BtnCustom style={styles.toolBtn} onEvent={onToggleVideo}>
            {isPause ? (
              <Pause fill={colors.purple} />
            ) : (
              <Resume fill={colors.purple} />
            )}
          </BtnCustom>
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.timelineContainer}>
          <View style={styles.timelineContainer2}>
            <SecondsDurationList duration={duration} />

            <TimelineList
              currInfo={videoTrim}
              timelineData={timeline}
              duration={duration}
              isToolOpen={currMode !== null}
              onUpdateTime={onUpdateInfo}
            />
          </View>
        </ScrollView>

        {currMode === null && (
          <View style={styles.whiteCol} pointerEvents="none" />
        )}
      </View>

      {currMode !== null && (
        <>
          {currMode === 'trim' && (
            <TrimTool
              onBack={() => {
                onChangeMode(null);
              }}
              onTrim={onSave}
              onRemove={onRemove}
            />
          )}

          {currMode === 'speed' && (
            <SpeedTool
              onBack={() => {
                onChangeMode(null);
              }}
              onChangeSpeed={onUpdateInfo}
              onSave={() => {
                onChangeMode(null);
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: '4%',
  },

  toolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  toolBtn: {
    marginLeft: '2%',
  },

  timelineContainer: {
    flexGrow: 1,
    paddingVertical: '2%',
  },

  timelineContainer2: {
    marginHorizontal: width / 2,
  },

  currToolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },

  backBtn: {
    backgroundColor: '#363636',
    paddingHorizontal: '0.6%',
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  whiteCol: {
    position: 'absolute',
    bottom: '0%',
    alignSelf: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
    height: '68%',
  },
});

export default VideoEditorFooter;
