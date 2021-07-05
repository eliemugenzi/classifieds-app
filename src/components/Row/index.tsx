import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import DIMENSIONS from '@app/utils/dimensions';

import styles from './styles';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  gutter?: number;
  equal?: boolean;
  style?: StyleProp<ViewStyle>;
  columnsStyles?: StyleProp<ViewStyle>[];
}

const Row: React.FC<Props> = ({
  children,
  gutter = DIMENSIONS.padding,
  equal = true,
  style,
  columnsStyles,
}) => {
  const theChildren = Array.isArray(children) ? children : [children];
  return (
    <View style={[styles.row, style]}>
      {theChildren.map((child, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              equal && styles.col,
              columnsStyles && columnsStyles[index],
            ]}>
            {child}
          </View>
          {index + 1 < theChildren.length && (
            <View style={{ width: gutter }} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Row;
