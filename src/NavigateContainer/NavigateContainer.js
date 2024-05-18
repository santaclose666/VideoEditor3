import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
const Stack = createStackNavigator();
const NavigateContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigateContainer;
const styles = StyleSheet.create({});
