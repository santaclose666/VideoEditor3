import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoEditor from '../screens/VideoEditor';
import VideoOverview from '../screens/VideoOverview';
import DrawerNavigation from './DrawNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeDraw" component={DrawerNavigation} />
      <Stack.Screen name="VideoOverview" component={VideoOverview} />
      <Stack.Screen name="VideoEditor" component={VideoEditor} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
