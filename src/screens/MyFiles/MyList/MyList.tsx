import {Alert, FlatList, Share, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import BtnCustom from '../../../components/BtnCustom';
import TextCustom from '../../../components/TextCustom';
import fonts from '../../../constants/fonts';
import {useQuery, useRealm} from '@realm/react';
import {VideoEditing, VideoDownloaded} from '../../../database/models';
import VideoItem from '../../../components/VideoItem';
import {MediaProps} from '../../../types';
import ActionBottomSheet from '../../../components/ActionBottomSheet';
import {width, videoStoragePath} from '../../../constants/orther';
import {RenameModal, VideoPopup} from '../../../components/ModalCustom';
import RNFS from 'react-native-fs';
import BottomSheetCustom from '../../../components/BottomSheetCustom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../../constants/colors';
import {Approve} from '../../../constants/svg';

interface MyListProps {
  onNavigation: (s: string, o: MediaProps) => void;
}

const selectSize = width * 0.07;

const MyList = ({onNavigation}: MyListProps) => {
  const realm = useRealm();
  const videoEditing = useQuery(VideoEditing);
  const videoDownloaded = useQuery(VideoDownloaded);
  const {bottom} = useSafeAreaInsets();

  const actionRef = useRef(null);
  const selectRef = useRef(null);

  const [videoPicker, setVideoPicker] = useState<MediaProps | null>(null);
  const [isVideoEditingTab, setIsVideoEditingTab] = useState(0);
  const [toggleRenamModal, setToggleRenameModal] = useState(false);
  const [toggleVideoPopup, setToggleVideoPopup] = useState(false);
  const [toggleSelect, setToggleSelect] = useState(false);
  const [listSelect, setListSelect] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleChangeTab = (tab: number) => {
    setIsVideoEditingTab(tab);
    clearData();
  };

  const clearData = () => {
    setIsSelectAll(false);
    setListSelect([]);
    closeSelectBottom();
    setToggleSelect(false);
  };

  const openBottomAction = () => {
    actionRef.current?.collapse();
  };
  const closeBottomAction = () => {
    actionRef.current?.close();
  };

  const openVideoModal = () => {
    setToggleVideoPopup(true);
  };
  const closeVideoModal = () => {
    setToggleVideoPopup(false);
  };

  const handlePressItem = (item: MediaProps) => {
    setVideoPicker(item);

    openVideoModal();
  };

  const handleMorePress = (item: MediaProps) => {
    setVideoPicker(item);

    clearData();
    openBottomAction();
  };

  const openRenameModal = () => {
    setToggleRenameModal(true);
  };
  const closeRenameMOdal = () => {
    setToggleRenameModal(false);
  };

  const handleShare = () => {
    Share.share({
      title: 'Share my video!',
      url: videoStoragePath + '/' + videoPicker?.name,
    });
  };

  const handleRemove = () => {
    removeItem(videoPicker);
    closeBottomAction();
    setVideoPicker(null);
  };

  const removeItem = async (obj: MediaProps) => {
    try {
      await RNFS.unlink(videoStoragePath + '/' + obj.name);

      realm.write(() => {
        realm.delete(obj);
      });
    } catch (error) {
      console.log(error);
    }
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
      Alert.alert('Error occurred while rename!');
    } finally {
      closeRenameMOdal();
      closeBottomAction();
    }
  };

  const handleSelectVideo = (idx: number) => {
    let newList = [...listSelect];

    if (newList.includes(idx)) {
      newList = newList.filter(item => item !== idx);
    } else {
      newList.push(idx);
    }

    setListSelect(newList);
  };

  const openSelectBottom = () => {
    selectRef.current?.collapse();
  };

  const closeSelectBottom = () => {
    selectRef.current?.close();
  };

  const handleOpenSelect = () => {
    setToggleSelect(!toggleSelect);

    if (toggleSelect) {
      closeSelectBottom();
      setListSelect([]);
    } else {
      openSelectBottom();
    }
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setListSelect([]);
    } else {
      const size = isVideoEditingTab === 0 ? videoEditing : videoDownloaded;

      const arr = size.map((_, idx) => idx);

      setListSelect(arr);
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleDelete = async () => {
    const video = isVideoEditingTab === 0 ? videoEditing : videoDownloaded;

    let data = [];
    for (let i of listSelect) {
      data.push(video[i]);
    }

    data.forEach(async item => {
      await removeItem(item);
    });

    clearData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <BtnCustom
          style={{
            ...styles.tabBtn,
            backgroundColor: isVideoEditingTab === 0 ? 'white' : '#ffffff20',
          }}
          onEvent={() => {
            handleChangeTab(0);
          }}>
          <TextCustom
            text={'Video Editing'}
            fontSize={18}
            fontFamily={fonts.semiBold}
            color={isVideoEditingTab === 0 ? 'black' : 'white'}
          />
        </BtnCustom>
        <BtnCustom
          style={{
            ...styles.tabBtn,
            backgroundColor: isVideoEditingTab === 0 ? '#ffffff20' : 'white',
          }}
          onEvent={() => {
            handleChangeTab(1);
          }}>
          <TextCustom
            text={'Downloaded'}
            fontSize={18}
            fontFamily={fonts.semiBold}
            color={isVideoEditingTab === 0 ? 'white' : 'black'}
          />
        </BtnCustom>
      </View>

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.listInfoContainer}>
          <TextCustom
            text={`(${
              isVideoEditingTab === 0
                ? videoEditing.length
                : videoDownloaded.length
            }) Videos`}
          />

          <BtnCustom
            disable={
              isVideoEditingTab === 0
                ? videoEditing.length === 0
                : videoDownloaded.length === 0
            }
            onEvent={handleOpenSelect}>
            <TextCustom text={toggleSelect ? 'Cancel' : 'Select'} />
          </BtnCustom>
        </View>

        <FlatList
          data={isVideoEditingTab === 0 ? videoEditing : videoDownloaded}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <VideoItem
              item={item}
              index={index}
              listSelected={listSelect}
              toggleSelect={toggleSelect}
              onPressItem={handlePressItem}
              onMorePress={handleMorePress}
              onSelectVideo={handleSelectVideo}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: '3.5%',
            paddingBottom: width * 0.16 + bottom,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <ActionBottomSheet
        ref={actionRef}
        snapoint={['28%']}
        openRenameModal={openRenameModal}
        handleShare={handleShare}
        handleRemove={handleRemove}
      />

      <BottomSheetCustom
        ref={selectRef}
        snapoint={['12%']}
        showBackDrop={false}
        style={styles.selectBottom}>
        <View style={[styles.selectBottomContainer, {paddingBottom: bottom}]}>
          <BtnCustom
            style={styles.selectAllContainer}
            onEvent={handleSelectAll}>
            <View
              style={{...styles.selectBtn, borderWidth: isSelectAll ? 0 : 2}}>
              {isSelectAll && (
                <View style={styles.select}>
                  <Approve />
                </View>
              )}
            </View>

            <TextCustom text={'Select All'} color={colors.yellow} />
          </BtnCustom>

          <BtnCustom disable={listSelect.length === 0} onEvent={handleDelete}>
            <TextCustom
              text={'Delete'}
              color={listSelect.length === 0 ? colors.gray : '#EB3939'}
            />
          </BtnCustom>
        </View>
      </BottomSheetCustom>

      <RenameModal
        toggle={toggleRenamModal}
        handleRenameProject={handleRenameProject}
        onClose={closeRenameMOdal}
      />

      <VideoPopup
        toggle={toggleVideoPopup}
        onClose={closeVideoModal}
        onEditVideo={() => {
          closeVideoModal();
          onNavigation('VideoEditor', videoPicker);
        }}
        onPlayVideo={() => {
          closeVideoModal();
          onNavigation('VideoOverview', videoPicker);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: '6%',
  },

  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabBtn: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '4%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },

  listInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: '3.5%',
    paddingVertical: '3%',
  },

  selectBottom: {
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
  },

  selectBottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },

  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectBtn: {
    width: selectSize,
    height: selectSize,
    borderRadius: 50,
    marginRight: '6%',
  },

  select: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
  },
});

export default MyList;
