import {Realm} from '@realm/react';
import {ObjectSchema} from 'realm';
import {generateId} from '../util/video';

export class VideoDownloaded extends Realm.Object<VideoDownloaded> {
  static schema: ObjectSchema = {
    name: 'VideoDownloaded',
    properties: {
      id: {type: 'string', default: generateId()},
      name: 'string',
      thumbnail: 'string',
      duration: 'int',
      timelineData: 'string[]',
      dateCreated: 'string',
      size: 'string',
    },
  };
}

export class VideoEditing extends Realm.Object<VideoEditing> {
  static schema: ObjectSchema = {
    name: 'VideoEditing',
    properties: {
      id: {type: 'string', default: generateId()},
      name: 'string',
      thumbnail: 'string',
      duration: 'int',
      timelineData: 'string[]',
      dateCreated: 'string',
      size: 'string',
    },
  };
}
