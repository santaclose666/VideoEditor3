import {StyleSheet, View, Share, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeHeader from './HomeHeader/HomeHeader';
import VideoImport from './VideoImport/VideoImport';
import ImagePicker from 'react-native-image-crop-picker';
import {useQuery, useRealm} from '@realm/react';
import {VideoEditing} from '../../database/models';
import {MediaProps} from '../../types';
import {
  bytesToMb,
  createFolder,
  generateId,
  generateThumbnail,
  generateTimeline,
  getCurrDate,
  storeMedia,
} from '../../util/video';
import {videoStoragePath} from '../../constants/orther';
import ActionBottomSheet from '../../components/ActionBottomSheet';
import LoadingCustom from '../../components/LoadingCustom';
import RNFS from 'react-native-fs';
import {RenameModal, VideoPopup} from '../../components/ModalCustom';

interface HomeProps {
  navigation: any;
}

const Home = ({navigation}: HomeProps) => {
  const {top} = useSafeAreaInsets();

  const actionRef = useRef(null);

  const [videoPicker, setVideoPicker] = useState<MediaProps | null>(null);
  const [toggleRenamModal, setToggleRenameModal] = useState(false);
  const [toggleVideoPopup, setToggleVideoPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const realm = useRealm();
  const videoEditing = useQuery(VideoEditing);

  useEffect(() => {
    createNecessaryFolder();
  }, []);

  const createNecessaryFolder = async () => {
    await createFolder(videoStoragePath);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const removeVideoEditing = async (item: MediaProps) => {
    await RNFS.unlink(videoStoragePath + '/' + item.name);

    realm.write(() => {
      realm.delete(item);
    });
  };
  const storeVideoEditing = (item: MediaProps) => {
    realm.write(() => {
      realm.create(VideoEditing, item);
    });
  };

  const handlePickVideo = async () => {
    try {
      const data = await ImagePicker.openPicker({
        mediaType: 'video',
        multiple: true,
      });

      for (let item of data) {
        const {path, duration, size} = item;
        console.log(path);

        const name = `${generateId()}.mp4`;
        const secondDuration = duration / 1000;

        const thumbnail = await generateThumbnail(path, secondDuration);
        const timelineData = await generateTimeline(path, secondDuration);
        await storeMedia(path, videoStoragePath, name);

        const obj: MediaProps = {
          id: generateId(),
          name,
          size: bytesToMb(size),
          duration: secondDuration,
          dateCreated: getCurrDate(),
          thumbnail,
          timelineData,
        };

        storeVideoEditing(obj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeemMore = () => {
    navigation.jumpTo('MyFiles');
  };

  const openVideoModal = () => {
    setToggleVideoPopup(true);
  };
  const closeVideoModal = () => {
    setToggleVideoPopup(false);
  };

  const handlePressVideo = (item: MediaProps) => {
    setVideoPicker(item);
    openVideoModal();
  };

  const openBottomAction = () => {
    actionRef.current?.collapse();
  };
  const closeBottomAction = () => {
    actionRef.current?.close();
  };

  const handlePressMore = (item: MediaProps) => {
    setVideoPicker(item);

    openBottomAction();
  };

  const handleShare = async () => {
    await Share.share({
      title: 'Share my video!',
      url: videoStoragePath + '/' + videoPicker?.name,
    });
  };

  const handleRemove = async () => {
    await removeVideoEditing(videoPicker);

    setVideoPicker(null);
    closeBottomAction();
  };

  const openRenameModal = () => {
    setToggleRenameModal(true);
  };

  const closeRenameModal = () => {
    setToggleRenameModal(false);
  };

  const handleImportStart = () => {
    setIsLoading(true);
  };

  const handleImportEnd = () => {
    setIsLoading(false);
  };

  const handleRenameProject = async (inputName: string) => {
    try {
      const newName = inputName.endsWith('.mp4')
        ? inputName
        : inputName + '.mp4';
      const oldPath = videoStoragePath + '/' + videoPicker?.name;
      const newPath = videoStoragePath + '/' + newName;

      await RNFS.moveFile(oldPath, newPath);

      const toUpdate = realm
        .objects(VideoEditing)
        .filtered(`id == $0`, videoPicker?.id);

      realm.write(() => {
        toUpdate[0].name = newName;
      });
    } catch (error) {
      console.log(error);

      Alert.alert('Error occurred while rename!');
    } finally {
      closeRenameModal();
      closeBottomAction();
    }
  };

  const handleOpenVideoImport = (obj: MediaProps) => {
    navigation.navigate('VideoOverview', obj);
  };

  const handleNavigate = (screen: string, obj: MediaProps) => {
    closeVideoModal();
    navigation.navigate(screen, obj);
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <HomeHeader onOpenMenu={openDrawer} />

      <VideoImport
        data={videoEditing}
        onPickMedia={handlePickVideo}
        onSeeMore={handleSeemMore}
        onPressMedia={handlePressVideo}
        onPressMore={handlePressMore}
        onStoreVideo={storeVideoEditing}
        onImportStart={handleImportStart}
        onImportEnd={handleImportEnd}
        onOpenWhenImport={handleOpenVideoImport}
      />

      <ActionBottomSheet
        ref={actionRef}
        openRenameModal={openRenameModal}
        handleRemove={handleRemove}
        handleShare={handleShare}
      />

      <RenameModal
        toggle={toggleRenamModal}
        handleRenameProject={handleRenameProject}
        onClose={closeRenameModal}
      />

      <VideoPopup
        toggle={toggleVideoPopup}
        onClose={closeVideoModal}
        onEditVideo={() => {
          handleNavigate('VideoEditor', videoPicker);
        }}
        onPlayVideo={() => {
          handleNavigate('VideoOverview', videoPicker);
        }}
      />

      <LoadingCustom isVisable={isLoading} text="Downloading video" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },
});

export default Home;
