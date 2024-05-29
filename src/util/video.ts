import {v4 as uuid} from 'uuid';
import RNFS from 'react-native-fs';
import {timeline, videoStoragePath} from '../constants/orther';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import axios from 'axios';
import {getVideoDuration} from 'react-native-video-duration';
import {videoTrim} from '../types';

const {framesPerSec} = timeline;

export const checkFileType = async (url: string) => {
  try {
    const response = await axios.head(url);
    const contentType = response.headers['content-type'];
    return contentType;
  } catch (error) {
    return null;
  }
};

export const getDuration = async (uri: string) => {
  const result = await getVideoDuration(uri);

  return floorNumber(result);
};

export const generateId = () => {
  return uuid();
};

export const fixedNumber = (num: number, fixed?: number) => {
  return num.toFixed(fixed || 2);
};

export const floorNumber = (num: number) => {
  return Math.floor(num);
};

export const padNumber = (number: number, pad?: number) => {
  return number.toString().padStart(pad || 2, '0');
};

export const bytesToMb = (size: number) => {
  return fixedNumber(size / 1048576);
};

export const getCurrDate = () => {
  const today = new Date();

  const day = today.getDate();
  const month = today.toLocaleString('default', {month: 'long'});
  const year = today.getFullYear();

  const currDate = `${day} ${month}, ${year}`;

  return currDate;
};

export const durationToTime = (duration: number) => {
  const minutes = floorNumber(duration / 60);
  const seconds = floorNumber(duration % 60);

  return {minutes: padNumber(minutes), seconds: padNumber(seconds)};
};

export const createFolder = async (uri: string) => {
  const isExist = await RNFS.exists(uri);

  if (!isExist) {
    await RNFS.mkdir(uri);
  }
};

export const storeMedia = async (
  rootPath: string,
  destinationPath: string,
  videoName: string,
) => {
  await RNFS.copyFile(rootPath, destinationPath + '/' + videoName);
};

export const generateBase64Img = async (uri: string) => {
  const base64 = await RNFS.readFile(uri, 'base64');
  await RNFS.unlink(uri);

  return base64;
};

export const generateThumbnail = async (uri: string, duration: number) => {
  const timeCapture = duration * 0.05;

  const thumbnailDestination =
    RNFS.CachesDirectoryPath + `/${generateId()}.jpg`;

  const cmd = `-i ${uri} -ss 00:00:${timeCapture} -frames:v 1 ${thumbnailDestination}`;
  await FFmpegKit.execute(cmd);

  const base64Img = await generateBase64Img(thumbnailDestination);

  return base64Img;
};

export const generateListBase64 = async (duration: number, output: string) => {
  let base64Arr = [];

  for (let i = 1; i <= duration; i++) {
    const uriIdx = output.replace('%4d', padNumber(i, 4));

    const base64Img = await generateBase64Img(uriIdx);

    base64Arr.push(base64Img);
  }

  return base64Arr;
};

export const generateTimeline = async (uri: string, duration: number) => {
  const timelineOutput =
    RNFS.TemporaryDirectoryPath + `${generateId()}_%4d.jpg`;
  const allFrames = floorNumber(duration * framesPerSec);

  const cmd = `-i ${uri} -vf "fps=${framesPerSec}/1" -vframes ${allFrames} ${timelineOutput}`;
  await FFmpegKit.execute(cmd);

  const timelineData = await generateListBase64(
    duration * framesPerSec,
    timelineOutput,
  );

  return timelineData;
};

export const handleTrimVideo = async (uri: string, videoInfo: videoTrim) => {
  try {
    const {startTime, endTime, speed} = videoInfo;
    const vidName = `${generateId()}.mp4`;

    const videoOuput = videoStoragePath + '/' + vidName;

    const start = durationToTime(startTime);
    const startT = `${start.minutes}:${start.seconds}`;

    const end = durationToTime(endTime);
    const endT = `${end.minutes}:${end.seconds}`;

    const cmd = `-i ${uri} -ss 00:${startT} -t 00:${endT} -vf "setpts=${
      1 / speed
    }*PTS" -af "atempo=${speed}" ${videoOuput}`;

    await FFmpegKit.execute(cmd);

    return vidName;
  } catch (error) {
    console.log('err', error);
  }
};
