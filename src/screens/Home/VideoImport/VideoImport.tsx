import {Alert, FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import TextCustom from '../../../components/TextCustom';
import fonts from '../../../constants/fonts';
import {Search} from '../../../constants/svg';
import colors from '../../../constants/colors';
import BtnCustom from '../../../components/BtnCustom';
import Clipboard from '@react-native-clipboard/clipboard';
import {MediaProps} from '../../../types';
import VideoItem from '../../../components/VideoItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';
import {videoStoragePath} from '../../../constants/orther';
import {
  bytesToMb,
  checkFileType,
  generateId,
  generateThumbnail,
  generateTimeline,
  getCurrDate,
  getDuration,
} from '../../../util/video';

interface VideoImportProps {
  data: MediaProps[];
  onPickMedia: () => void;
  onSeeMore: () => void;
  onPressMedia: (i: MediaProps) => void;
  onPressMore: (i: MediaProps) => void;
  onStoreVideo: (o: MediaProps) => void;
  onImportStart: () => void;
  onImportEnd: () => void;
  onOpenWhenImport: (i: MediaProps) => void;
}

const VideoImport = ({
  data,
  onPickMedia,
  onSeeMore,
  onPressMedia,
  onPressMore,
  onStoreVideo,
  onImportStart,
  onImportEnd,
  onOpenWhenImport,
}: VideoImportProps) => {
  const {bottom} = useSafeAreaInsets();

  const [input, setInput] = useState('');

  const handlePasteText = async () => {
    const text = await Clipboard.getString();
    setInput(text);
  };

  const handleImportVid = async () => {
    onImportStart();
    try {
      const vidName = `${generateId()}.mp4`;
      const destination = videoStoragePath + '/' + vidName;

      const type = await checkFileType(input);

      if (type !== 'video/mp4') {
        return Alert.alert('Type is not supported');
      }

      const data = await RNFS.downloadFile({
        fromUrl: input,
        toFile: destination,
      }).promise;

      if (data.statusCode === 200) {
        const stat = await RNFS.stat(destination);

        const duration = await getDuration(destination);
        const thumbnail = await generateThumbnail(destination, duration);
        const timelineData = await generateTimeline(destination, duration);

        const obj: MediaProps = {
          id: generateId(),
          name: vidName,
          size: bytesToMb(stat.size),
          thumbnail,
          timelineData,
          duration,
          dateCreated: getCurrDate(),
        };

        onStoreVideo(obj);

        onOpenWhenImport(obj);
      }
    } catch (error) {
      console.log(error);

      Alert.alert('Has some errors occurred');
    } finally {
      setInput('');
      onImportEnd();
    }
  };

  return (
    <View style={styles.container}>
      <TextCustom
        text="Import Videos"
        style={styles.marginText}
        fontSize={24}
        fontFamily={fonts.semiBold}
      />

      <View style={styles.textInputContainer}>
        <Search />
        <TextInput
          placeholder="Paste the link here"
          placeholderTextColor={colors.gray}
          value={input}
          onChangeText={setInput}
          style={styles.textInput}
        />

        <BtnCustom
          extraComponent={
            <TextCustom
              text={input.length > 6 ? 'Import' : 'Paste'}
              color="white"
            />
          }
          style={{
            ...styles.textInputBtn,
            backgroundColor: input.length > 6 ? colors.yellow : 'black',
          }}
          onEvent={input.length > 6 ? handleImportVid : handlePasteText}
        />
      </View>

      <TextCustom text="OR" style={styles.marginText} />

      <BtnCustom
        extraComponent={
          <TextCustom
            text="From Library"
            color="white"
            fontFamily={fonts.bold}
            fontSize={18}
          />
        }
        style={styles.pickBtn}
        onEvent={onPickMedia}
      />

      <View style={styles.videoEditingTextContainer}>
        <TextCustom
          text="Video editting"
          fontFamily={fonts.semiBold}
          fontSize={20}
        />

        <BtnCustom
          extraComponent={
            <TextCustom
              text="More"
              color={colors.gray}
              fontFamily={fonts.ligth}
            />
          }
          onEvent={onSeeMore}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <VideoItem
            item={item}
            index={index}
            onPressItem={onPressMedia}
            onMorePress={onPressMore}
          />
        )}
        style={{width: '100%'}}
        contentContainerStyle={{marginTop: '3.5%', paddingBottom: bottom}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <TextCustom
            text={'No video editing found!'}
            color={colors.yellow}
            fontSize={18}
            style={{textAlign: 'center'}}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: '5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },

  marginText: {
    marginBottom: '4.5%',
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#e4e4e4',
    paddingVertical: '2%',
    paddingHorizontal: '3.5%',
    marginBottom: '4.5%',
  },

  textInput: {
    width: '70%',
    fontFamily: fonts.ligth,
    fontSize: 16,
    marginLeft: '2%',
  },

  textInputBtn: {
    paddingVertical: '1.8%',
    paddingHorizontal: '3.6%',
    borderRadius: 16,
  },

  pickBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
    paddingVertical: '3.5%',
    borderRadius: 50,
  },

  videoEditingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '6%',
  },
});

export default VideoImport;
