import {Pressable, ViewStyle} from 'react-native';
import React, {ReactElement, ReactNode} from 'react';
import {SvgProps} from 'react-native-svg';

interface BtnCustomProps {
  extraComponent?: ReactElement<SvgProps> | ReactNode;
  children?: ReactNode;
  disable?: boolean;
  style?: ViewStyle;
  onEvent?: () => void;
}

const BtnCustom = ({
  extraComponent,
  children,
  disable = false,
  style,
  onEvent,
}: BtnCustomProps) => {
  return (
    <Pressable onPress={onEvent} disabled={disable} style={style}>
      {extraComponent}
      {children}
    </Pressable>
  );
};

export default BtnCustom;
