import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video, {VideoRef} from 'react-native-video';
const VideoItem = ({navigate, route}) => {
  const {linkVideo} = route.params;
  return (
    <View style={{flex: 1}}>
      <Video style={{flex: 1}}></Video>
    </View>
  );
};
export default VideoItem;
const styles = StyleSheet.create({});
