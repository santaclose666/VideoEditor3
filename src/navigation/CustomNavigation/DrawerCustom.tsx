import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Dimiss, LayoutL, Menu} from '../../constants/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextCustom from '../../components/TextCustom';
import BtnCustom from '../../components/BtnCustom';
import fonts from '../../constants/fonts';
import {CommonActions, DrawerActions} from '@react-navigation/native';

const activeColor = '#ffffff';
const inActiveColor = '#363636';

const DrawerCustom = ({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) => {
  const {top} = useSafeAreaInsets();

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const renderDrawerItem = ({item, index}: any) => {
    const focused = index === state.index;

    const {name} = item;
    const {title} = descriptors[item.key].options;

    const onPress = () => {
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: item.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({name: name, merge: true})),
          target: state.key,
        });
      }
    };

    return (
      <BtnCustom key={item.key} style={styles.drawerBtn} onEvent={onPress}>
        <LayoutL stroke={focused ? activeColor : inActiveColor} />
        <TextCustom
          text={title || name}
          fontSize={20}
          fontFamily={fonts.semiBold}
          color={focused ? activeColor : inActiveColor}
          style={styles.title}
        />
      </BtnCustom>
    );
  };

  return (
    <View style={[styles.drawerContainer, {paddingTop: top}]}>
      <View style={styles.drawerHeaderContainer}>
        <Menu />
        <TextCustom
          text="Menu"
          color="white"
          fontSize={28}
          fontFamily={fonts.semiBold}
          style={{width: '82%'}}
        />
        <BtnCustom extraComponent={<Dimiss />} onEvent={closeDrawer} />
      </View>

      <FlatList
        data={state.routes}
        keyExtractor={item => item.key}
        renderItem={renderDrawerItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {},

  drawerHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '3%',
    marginBottom: '6%',
  },

  drawerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff30',
    paddingHorizontal: '3%',
    paddingVertical: '3.3%',
  },

  title: {
    marginLeft: '3%',
  },
});

export default DrawerCustom;
