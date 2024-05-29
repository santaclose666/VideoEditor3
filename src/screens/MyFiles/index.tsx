import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import MyFileHeader from './MyFilesHeader/MyFileHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MyList from './MyList/MyList';
import {MediaProps} from '../../types';

const MyFiles = ({navigation}: any) => {
  const {top} = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigation = (screen: string, obj: MediaProps) => {
    navigation.navigate(screen, obj);
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <MyFileHeader onBack={handleBack} />

      <MyList onNavigation={handleNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },
});

export default MyFiles;
