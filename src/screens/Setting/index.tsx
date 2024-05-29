import {Alert, Linking, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import BtnCustom from '../../components/BtnCustom';
import {
  ArrowBack,
  Feedback,
  Privacy,
  Settings,
  Star,
} from '../../constants/svg';
import TextCustom from '../../components/TextCustom';
import {height, width} from '../../constants/orther';
import fonts from '../../constants/fonts';

const link = 'https://www.youtube.com/watch?v=OPf0YbXqDm0';

const Setting = ({navigation}: any) => {
  const {top} = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenlink = async (link: string) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert('Link is not supported');
    }
  };

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.headerContainer}>
        <View style={styles.leftSetting}>
          <BtnCustom onEvent={handleBack}>
            <ArrowBack />
          </BtnCustom>

          <TextCustom
            text={'Setting'}
            color="white"
            fontSize={width * 0.08}
            fontFamily={fonts.semiBold}
            style={{marginTop: '30%'}}
          />
        </View>

        <Settings height={height * 0.16} />
      </View>

      <View style={styles.bodyContainer}>
        <BtnCustom
          style={styles.btn}
          onEvent={() => {
            handleOpenlink(link);
          }}>
          <Star />
          <TextCustom
            text={'Rate our application'}
            style={{marginLeft: '3%'}}
            fontFamily={fonts.ligth}
          />
        </BtnCustom>
        <BtnCustom
          style={styles.btn}
          onEvent={() => {
            handleOpenlink(link);
          }}>
          <Privacy />
          <TextCustom
            text={'Privacy Policy'}
            style={{marginLeft: '3%'}}
            fontFamily={fonts.ligth}
          />
        </BtnCustom>
        <BtnCustom
          style={styles.btn}
          onEvent={() => {
            handleOpenlink(link);
          }}>
          <Feedback />
          <TextCustom
            text={'FeedBack and Report'}
            style={{marginLeft: '3%'}}
            fontFamily={fonts.ligth}
          />
        </BtnCustom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSetting: {
    paddingLeft: '5%',
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 22,
    paddingTop: '6%',
    paddingHorizontal: '4%',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
});

export default Setting;
