import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Typography from '../Typography';

import styles from './styles';

const transform = (name: string, single: boolean) => {
  let str = '';

  const arr = name.trim().split(' ');
  if (single) str = arr[0].charAt(0);
  else if (arr.length === 1)
    str = arr[0].charAt(0) + arr[0].charAt(1);
  else str = arr[0].charAt(0) + arr[1].charAt(0);

  return str.toUpperCase();
};

interface Props {
  single?: boolean;
  name: string;
  color: string;
  style?: StyleProp<ViewStyle>;
}

const Initials: React.FC<Props> = ({
  single = false,
  color,
  name,
  style,
}) => {
  return (
    <View style={[styles.wrapper, { backgroundColor: color }, style]}>
      <Typography.Text style={styles.text}>
        {transform(name || 'User', single)}
      </Typography.Text>
    </View>
  );
};

export default Initials;
