import {StyleSheet, View} from 'react-native';
import React from 'react';
import BtnCustom from '../../../components/BtnCustom';
import {Back, Remove, Trim} from '../../../constants/svg';
import {height} from '../../../constants/orther';
import colors from '../../../constants/colors';

interface TrimToolProps {
  onBack: () => void;
  onTrim: () => void;
  onRemove: () => void;
}

const TrimTool = ({onBack, onTrim, onRemove}: TrimToolProps) => {
  return (
    <View style={styles.container}>
      <BtnCustom style={styles.backBtn} onEvent={onBack}>
        <Back />
      </BtnCustom>

      <View style={styles.toolContainer}>
        <BtnCustom style={styles.btn} onEvent={onTrim}>
          <Trim fill={'#838383'} />
        </BtnCustom>

        <BtnCustom
          style={{...styles.btn, backgroundColor: '#4d2a2a', marginLeft: '2%'}}
          onEvent={onRemove}>
          <Remove />
        </BtnCustom>
      </View>

      <View style={[styles.backBtn, {backgroundColor: 'transparent'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },

  toolContainer: {
    width: '24%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btn: {
    padding: 10,
    backgroundColor: '#363636',
    borderRadius: 12,
  },

  backBtn: {
    backgroundColor: colors.gray,
    paddingHorizontal: 2,
    height: height * 0.05,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrimTool;
