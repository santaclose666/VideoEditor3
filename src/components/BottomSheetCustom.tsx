import React, {forwardRef, useMemo, ReactNode} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ViewStyle} from 'react-native';

interface BottomSheetCustomProps {
  snapoint?: string[];
  children?: ReactNode;
  style?: ViewStyle;
  showBackDrop?: boolean;
}

const BottomSheetCustom = (
  {
    snapoint = ['30%'],
    showBackDrop = true,
    style,
    children,
  }: BottomSheetCustomProps,
  ref: any,
) => {
  const snapPoint = useMemo(() => snapoint, []);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoint}
      index={-1}
      backgroundStyle={style}
      handleComponent={null}
      backdropComponent={props => (
        <>
          {showBackDrop && (
            <BottomSheetBackdrop
              {...props}
              opacity={0.5}
              enableTouchThrough={true}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
        </>
      )}>
      {children}
    </BottomSheet>
  );
};

export default forwardRef(BottomSheetCustom);
