import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Media, Menu} from '../../../constants/svg';
import {width} from '../../../constants/orther';
import BtnCustom from '../../../components/BtnCustom';

interface HomeHeaderProps {
  onOpenMenu: () => void;
}

const HomeHeader = ({onOpenMenu}: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.btn} />

      <Media width={width * 0.7} />

      <BtnCustom
        extraComponent={<Menu />}
        style={styles.btn}
        onEvent={onOpenMenu}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: '2%',
    paddingBottom: '10%',
    paddingHorizontal: '3%',
  },

  btn: {
    width: '8%',
  },
});
export default HomeHeader;
