/*
 * Component: Base
 * Created At: 2020-10-09 15:15:37
 */

import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

import styles, { BaseType } from './styles';
type EllipsisType =
  | undefined
  | boolean
  | { rows: number; mode?: 'head' | 'middle' | 'tail' | 'clip' };

export interface Props {
  children:
    | string
    | string[]
    | React.ReactText
    | React.ReactText[]
    | React.ReactElement
    | React.ReactNode;
  ellipsis?: EllipsisType;
  strong?: boolean;
  underline?: boolean;
  mark?: boolean;
  code?: boolean;
  type?: BaseType;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  level?: number;
}

const ellipsisConfig = (ellipsis: EllipsisType) => {
  const ellipsisProps: { [key: string]: any } = {};

  if (ellipsis) {
    ellipsisProps.ellipsis = true;
    ellipsisProps.numberOfLines = 1;
    if (typeof ellipsis === 'object') {
      ellipsisProps.numberOfLines = ellipsis.rows;
      if (ellipsis.mode) ellipsisProps.ellipsizeMode = ellipsis.mode;
    }
  }

  return ellipsisProps;
};

const Base: React.FC<Props> = ({
  children,
  ellipsis,
  strong,
  style,
  numberOfLines,
  level = 1,
}) => {
  const styles_ = styles({ level });
  return (
    <Text
      {...ellipsisConfig(ellipsis)}
      style={[
        styles_.text,
        strong ? styles_.boldedText : styles_.regularText,
        style,
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default Base;
