import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import TextCustom from './TextCustom';

interface LoadingCustomProps {
  isVisable: boolean;
  text?: string;
}

const LoadingCustom = ({isVisable, text}: LoadingCustomProps) => {
  if (!isVisable) {
    return;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.purple} />

      <TextCustom text={text} color="white" style={{marginTop: 6}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
});

export default LoadingCustom;
