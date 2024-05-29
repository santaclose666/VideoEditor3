import {Text, TextStyle} from 'react-native';
import React from 'react';
import fonts from '../constants/fonts';

interface TextCustomProps {
  text?: string | number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  lineNumber?: number;
  style?: TextStyle;
}

const TextCustom = ({
  text = '',
  fontFamily = fonts.medium,
  fontSize = 17,
  color = '#000',
  lineNumber,
  style,
}: TextCustomProps) => {
  return (
    <Text
      style={[{fontSize, fontFamily, color}, style]}
      selectable={true}
      numberOfLines={lineNumber}>
      {text}
    </Text>
  );
};

export default TextCustom;
