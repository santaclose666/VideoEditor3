import React from 'react';
import 'react-native-get-random-values';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';
import {RealmProvider} from '@realm/react';
import {VideoEditing, VideoDownloaded} from './src/database/models';

const App = () => {
  return (
    <RealmProvider
      schema={[VideoEditing, VideoDownloaded]}
      schemaVersion={0}
      deleteRealmIfMigrationNeeded={true}>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigation />
      </GestureHandlerRootView>
    </RealmProvider>
  );
};

export default App;
