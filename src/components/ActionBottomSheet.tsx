import {StyleSheet} from 'react-native';
import React, {forwardRef} from 'react';
import BtnCustom from './BtnCustom';
import {Remove2, Rename, Share} from '../constants/svg';
import TextCustom from './TextCustom';
import BottomSheetCustom from './BottomSheetCustom';
import colors from '../constants/colors';

interface ActionBottomSheetProps {
  snapoint?: string[];
  openRenameModal: () => void;
  handleShare: () => void;
  handleRemove: () => void;
}

const ActionBottomSheet = (
  {
    snapoint = ['25%'],
    openRenameModal,
    handleShare,
    handleRemove,
  }: ActionBottomSheetProps,
  ref: any,
) => {
  return (
    <BottomSheetCustom ref={ref} snapoint={snapoint}>
      <BtnCustom
        style={{...styles.btnAction, marginTop: '3%'}}
        onEvent={openRenameModal}>
        <Rename />
        <TextCustom text={'Rename'} fontSize={18} style={styles.textStyle} />
      </BtnCustom>
      <BtnCustom style={styles.btnAction} onEvent={handleShare}>
        <Share />
        <TextCustom text={'Share'} fontSize={18} style={styles.textStyle} />
      </BtnCustom>
      <BtnCustom
        style={{...styles.btnAction, borderBottomWidth: 0}}
        onEvent={handleRemove}>
        <Remove2 />
        <TextCustom text={'Delete'} fontSize={18} style={styles.textStyle} />
      </BtnCustom>
    </BottomSheetCustom>
  );
};

const styles = StyleSheet.create({
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3.3%',
    borderBottomWidth: 1.2,
    borderBottomColor: colors.gray + 20,
  },

  textStyle: {
    marginLeft: '3%',
  },
});

export default forwardRef(ActionBottomSheet);
