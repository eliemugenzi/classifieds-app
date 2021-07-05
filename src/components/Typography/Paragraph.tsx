/*
 * Component: Paragraph
 * Created At: 2020-10-13 12:55:01
 */

import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Base, { Props } from './Base';

import styles from './Base/styles';

interface ParagraphProps extends Props {
  paragraphStyle?: StyleProp<ViewStyle>;
}

const Paragraph: React.FC<ParagraphProps> = ({
  style,
  paragraphStyle,
  type = 'plain',
  ...props
}) => {
  const styles_ = styles({ level: props.level });
  return (
    <View style={[styles_.paragraph, paragraphStyle]}>
      <Base {...props} style={[style]} />
    </View>
  );
};

export default Paragraph;
