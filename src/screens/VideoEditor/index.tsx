import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import VideoEditorHeader from './VideoEditorHeader/VideoEditorHeader';
import VideoView from '../../components/VideoView';
import {videoStoragePath} from '../../constants/orther';
import {MediaProps, videoTrim as videoTrimProps, mode} from '../../types';
import VideoEditorFooter from './VideoEditorFooter/VideoEditorFooter';
import {
  bytesToMb,
  generateId,
  generateThumbnail,
  generateTimeline,
  getCurrDate,
  handleTrimVideo,
} from '../../util/video';
import LoadingCustom from '../../components/LoadingCustom';
import RNFS from 'react-native-fs';
import {useRealm} from '@realm/react';
import {VideoDownloaded} from '../../database/models';

const defaultInfo: videoTrimProps = {startTime: 0, endTime: 1, speed: 1};

const VideoEditor = ({navigation, route}: any) => {
  const {name, duration, timelineData}: MediaProps = route.params;

  const uri = videoStoragePath + '/' + name;

  const realm = useRealm();

  const [isPause, setIsPause] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [videoTrim, setVideoTrim] = useState<videoTrimProps>(defaultInfo);
  const [currMode, setCurrMode] = useState<mode>(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleVideo = () => {
    setIsPause(!isPause);
  };

  const onProgress = (data: any) => {
    setCurrTime(data.currentTime);
  };

  const changeMode = (mode: mode) => {
    setCurrMode(mode);
  };

  const updateInfo = (data: videoTrimProps) => {
    setVideoTrim({...videoTrim, ...data});
  };

  const removeInfo = () => {
    setVideoTrim(defaultInfo);
  };

  const createVideo = (data: MediaProps) => {
    realm.write(() => {
      realm.create(VideoDownloaded, data);
    });
  };

  const handleSaveVideoTrim = async () => {
    setLoading(true);

    try {
      const {startTime, endTime, speed} = videoTrim;
      const vidName = await handleTrimVideo(uri, videoTrim);

      const path = videoStoragePath + '/' + vidName;
      const newDuration = Math.round((endTime - startTime) / speed);

      const data = await RNFS.stat(path);
      const thumbnail = await generateThumbnail(path, newDuration);
      const timeline = await generateTimeline(path, newDuration);

      const obj: MediaProps = {
        id: generateId(),
        name: vidName,
        thumbnail,
        timelineData: timeline,
        duration: newDuration,
        dateCreated: getCurrDate(),
        size: bytesToMb(data.size),
      };

      createVideo(obj);
      Alert.alert('Video is stored successfully');
    } catch (error) {
      Alert.alert('Has error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <VideoEditorHeader
        onBack={handleBack}
        saveDisable={currMode === null}
        onSave={handleSaveVideoTrim}
      />

      <VideoView
        style={styles.video}
        uri={uri}
        isPause={isPause}
        onProgess={onProgress}
      />

      <VideoEditorFooter
        currMode={currMode}
        videoTrim={videoTrim}
        isPause={isPause}
        currTime={currTime}
        duration={duration}
        timeline={timelineData}
        onToggleVideo={handleToggleVideo}
        onChangeMode={changeMode}
        onUpdateInfo={updateInfo}
        onRemove={removeInfo}
        onSave={handleSaveVideoTrim}
      />

      <LoadingCustom isVisable={loading} text="Video Processing" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  video: {
    width: '100%',
    height: '60%',
    backgroundColor: 'black',
  },
});

export default VideoEditor;
