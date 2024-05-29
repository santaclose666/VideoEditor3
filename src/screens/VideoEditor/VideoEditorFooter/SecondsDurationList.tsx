import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {timeline} from '../../../constants/orther';
import TextCustom from '../../../components/TextCustom';
import colors from '../../../constants/colors';

interface SecondsDurationListProps {
  duration: number;
}

const {wide} = timeline;

const SecondsDurationList = ({duration}: SecondsDurationListProps) => {
  const dumpDuration = useMemo(() => new Array(duration).fill(null), []);

  const renderTime = useCallback(({_, index}: any) => {
    const isEven = index % 2 === 0;

    return (
      <View style={styles.secondContainer}>
        {isEven ? (
          <View style={styles.dot} />
        ) : (
          <TextCustom text={`${index}s`} color={colors.gray} />
        )}
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dumpDuration}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderTime}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          borderTopWidth: 1,
          borderTopColor: colors.gray,
          paddingTop: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },

  secondContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: wide,
  },

  dot: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: colors.gray,
  },
});

export default SecondsDurationList;
