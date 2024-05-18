import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React, {useRef, useMemo, useCallback, useState} from 'react';
import {ImgSvgsetting, SearchSvg} from '../../assets/ExportIconSVG';
import VideoItem from '../LybraryMyFILEs/VideoItem';
import {launchImageLibrary} from 'react-native-image-picker';
const HomeScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [dataVideo, setDataVideo] = useState([]);
  const [linkVideo, setLinkVideo] = useState('');
  const [isPateLink, setIsPateLink] = useState(false);
  const [touchdisble, setTouchDisble] = useState(true);

  const SelectVideoLaybrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      videoQuality: 'high ',
    });
    console.log(result);
  };
  const handlerChangText = Inputlink => {
    setLinkVideo(Inputlink);
    if (Inputlink === '') {
      setIsPateLink(false);
      setTouchDisble(true);
    } else {
      setIsPateLink(true);
      setTouchDisble(false);
    }
  };

  return (
    <View style={[styles.homeContainer, {width: width, height: height}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            top: '20%',
            width: '5%',
            right: '2%',
          }}>
          <ImgSvgsetting />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          source={require('../../assets/PngFolder/image.png')}
          style={[
            styles.styleimageHeader,
            {width: width / 3, height: width / 3},
          ]}
        />
      </View>
      <View style={styles.stbntModalBottomsheet}>
        <View style={styles.containerHead}>
          <Text style={styles.txtImport}>Import Videos</Text>
        </View>
        <View style={[styles.styleSearch, {height: 60}]}>
          <TouchableOpacity
            style={{
              width: '10%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchSvg />
          </TouchableOpacity>
          <TextInput
            onChangeText={text => handlerChangText(text)}
            placeholder="Enter conten search"
            style={styles.textInput}></TextInput>
          <TouchableOpacity
            disabled={touchdisble}
            style={[
              styles.stylePate,
              {
                backgroundColor: touchdisble ? 'black' : 'yellow',
              },
            ]}>
            <Text style={{color: touchdisble ? 'white' : 'black'}}>
              {touchdisble ? 'Pate' : 'black'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            marginVertical: '4%',
            fontSize: 18,
            bottom: '2%',
          }}>
          OR
        </Text>
        <TouchableOpacity style={styles.btnInput} onPress={SelectVideoLaybrary}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>From Labrary</Text>
        </TouchableOpacity>
        <View style={styles.stylelistView}>
          <Text style={{fontSize: 20, color: 'black'}}>Recenst Files</Text>
          <Text>More</Text>
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#7D6FD2',
  },
  headerContainer: {
    backgroundColor: '#7D6FD2',
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stbntModalBottomsheet: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: '5%',
    alignItems: 'center',
  },
  containerHead: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
  },
  txtImport: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  styleSearch: {
    borderWidth: 1,
    width: '95%',
    height: '8%',
    borderRadius: 50,
    borderColor: '#C0C0C0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    bottom: '5%',
  },

  textInput: {
    width: '65%',
    paddingHorizontal: 5,
  },
  stylePate: {
    backgroundColor: 'black',
    width: '20%',
    borderRadius: 50,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnInput: {
    width: '95%',
    height: '8%',
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#7D6FD2',
    bottom: '2%',
  },
  stylelistView: {
    paddingHorizontal: '4%',
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
