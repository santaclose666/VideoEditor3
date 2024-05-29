import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import TextCustom from './TextCustom';
import BtnCustom from './BtnCustom';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import {Close, Media2} from '../constants/svg';

interface CommonModal {
  toggle: boolean;
  onClose: () => void;
}

interface RenameModalProps extends CommonModal {
  handleRenameProject: (input: string) => void;
}

interface VideoPopupProps extends CommonModal {
  onPlayVideo: () => void;
  onEditVideo: () => void;
}

const RenameModal = ({
  toggle,
  onClose,
  handleRenameProject,
}: RenameModalProps) => {
  const [inputName, setInputName] = useState('');

  const clearInput = () => {
    setInputName('');
  };

  const handlRename = () => {
    handleRenameProject(inputName);
    clearInput();
  };

  const handleCloseModal = () => {
    onClose();
    clearInput();
  };

  return (
    <Modal isVisible={toggle}>
      <View style={styles.modalContainer}>
        <TextCustom
          text={'Rename project'}
          fontSize={19}
          fontFamily={fonts.semiBold}
        />

        <TextInput
          value={inputName}
          onChangeText={setInputName}
          style={styles.textInputName}
          autoFocus={true}
        />

        <View style={styles.inputBtnContainer}>
          <BtnCustom onEvent={handleCloseModal}>
            <TextCustom
              text={'Cancel'}
              fontFamily={fonts.semiBold}
              fontSize={18}
              color={colors.purple}
            />
          </BtnCustom>
          <BtnCustom
            disable={inputName.length === 0}
            style={{marginLeft: '6%'}}
            onEvent={handlRename}>
            <TextCustom
              text={'Save'}
              fontFamily={fonts.semiBold}
              fontSize={18}
              color={inputName.length === 0 ? colors.gray : colors.purple}
            />
          </BtnCustom>
        </View>
      </View>
    </Modal>
  );
};

const VideoPopup = ({
  toggle,
  onEditVideo,
  onPlayVideo,
  onClose,
}: VideoPopupProps) => {
  return (
    <Modal isVisible={toggle}>
      <View style={styles.header}>
        <BtnCustom onEvent={onClose} extraComponent={<Close />} />
      </View>

      <View style={styles.body}>
        <Media2 />

        <TextCustom
          text={
            'Your project is not complete. Do you want to play before editing?'
          }
          style={{textAlign: 'center', width: '90%', marginVertical: '5%'}}
        />

        <View style={styles.btnContainer}>
          <BtnCustom style={styles.btn} onEvent={onPlayVideo}>
            <TextCustom text={'Play now'} color={colors.purple} />
          </BtnCustom>
          <BtnCustom
            style={{...styles.btn, backgroundColor: colors.purple}}
            onEvent={onEditVideo}>
            <TextCustom text={'Edit now'} color={'white'} />
          </BtnCustom>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '6%',
    backgroundColor: 'white',
    borderRadius: 12,
  },

  inputBtnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  textInputName: {
    borderBottomWidth: 1,
    borderBottomColor: colors.purple,
    marginVertical: '5%',
    paddingVertical: '2%',
    paddingHorizontal: '1%',
    fontSize: 17,
    fontFamily: fonts.medium,
  },

  header: {
    backgroundColor: colors.purple,
    alignItems: 'flex-end',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: '4%',
  },

  body: {
    backgroundColor: 'white',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 8,
    width: '48%',
  },
});

export {RenameModal, VideoPopup};
