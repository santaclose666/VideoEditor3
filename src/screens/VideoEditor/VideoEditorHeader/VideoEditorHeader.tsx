import {StyleSheet, View} from 'react-native';
import React from 'react';
import BtnCustom from '../../../components/BtnCustom';
import {Back} from '../../../constants/svg';
import TextCustom from '../../../components/TextCustom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../../constants/colors';

interface VideoEditorHeaderProps {
  onBack: () => void;
  onSave: () => void;
  saveDisable: boolean;
}

const VideoEditorHeader = ({
  saveDisable,
  onBack,
  onSave,
}: VideoEditorHeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <BtnCustom style={styles.backBtn} onEvent={onBack}>
        <Back />
      </BtnCustom>

      <BtnCustom
        style={{
          ...styles.saveBtn,
          backgroundColor: saveDisable ? colors.gray : colors.purple,
        }}
        disable={saveDisable}
        onEvent={onSave}>
        <TextCustom text={'Save'} color="white" fontSize={16} />
      </BtnCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    paddingHorizontal: '4%',
    paddingBottom: '3%',
  },

  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    backgroundColor: '#363636',
    borderRadius: 8,
    width: 33,
    height: 33,
  },

  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 20,
  },

  undoContainer: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoEditorHeader;
