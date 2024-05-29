import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');
const videoStoragePath = RNFS.DocumentDirectoryPath + '/storage';
const timeline = {wide: width * 0.125, framesPerSec: 1.5};
const base64Img = 'data:image/jpeg;base64,';

export {width, height, videoStoragePath, timeline, base64Img};
