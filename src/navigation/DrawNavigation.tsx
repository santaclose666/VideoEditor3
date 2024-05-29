import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import MyFiles from '../screens/MyFiles';
import Setting from '../screens/Setting';
import DrawerCustom from './CustomNavigation/DrawerCustom';
import {width} from '../constants/orther';
import colors from '../constants/colors';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const customDrawer = (props: DrawerContentComponentProps) => {
    return <DrawerCustom {...props} />;
  };

  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          width: width,
          backgroundColor: colors.purple,
        },
      }}
      drawerContent={customDrawer}>
      <Drawer.Screen
        options={{title: 'Home'}}
        name="HomePage"
        component={Home}
      />
      <Drawer.Screen
        options={{title: 'My Files'}}
        name="MyFiles"
        component={MyFiles}
      />
      <Drawer.Screen
        options={{title: 'Setting'}}
        name="Settings"
        component={Setting}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
