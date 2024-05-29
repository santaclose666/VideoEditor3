import {Share, StyleSheet, View} from 'react-native';
import React from 'react';
import VideoOverviewHeader from './VideoOverviewHeader/VideoOverviewHeader';
import {MediaProps} from '../../types';
import {height, videoStoragePath, width} from '../../constants/orther';
import VideoPlayer from '../../components/VideoPlayer';

const VideoOverview = ({navigation, route}: any) => {
  const item: MediaProps = route.params;
  const {name} = item;

  const uri = videoStoragePath + '/' + name;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('VideoEditor', item);
  };

  const handleShare = async () => {
    await Share.share({
      title: 'Share my video!',
      url: uri,
    });
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        uri={uri}
        videoPlayerStyle={styles.videoPlayer}
        videoStyle={styles.video}
        progressStyle={styles.progress}
        controlStyle={styles.progress}
      />

      <VideoOverviewHeader
        name={name}
        onBack={handleBack}
        onShare={handleShare}
        onEdit={handleEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  videoPlayer: {
    flex: 1,
  },

  video: {
    width: width,
    height: height,
  },

  progress: {
    width: width,
    paddingHorizontal: '5%',
  },
});

export default VideoOverview;
