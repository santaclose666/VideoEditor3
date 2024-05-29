import {StyleSheet, View} from 'react-native';
import React from 'react';
import BtnCustom from '../../../components/BtnCustom';
import {ArrowBack} from '../../../constants/svg';
import TextCustom from '../../../components/TextCustom';
import fonts from '../../../constants/fonts';

interface MyFilesProps {
  onBack: () => void;
}

const MyFileHeader = ({onBack}: MyFilesProps) => {
  return (
    <View style={styles.container}>
      <BtnCustom onEvent={onBack} style={{width: '10%'}}>
        <ArrowBack />
      </BtnCustom>
      <TextCustom
        text={'My Files'}
        color="white"
        fontSize={20}
        fontFamily={fonts.semiBold}
      />
      <View style={{width: '10%'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
});

export default MyFileHeader;
