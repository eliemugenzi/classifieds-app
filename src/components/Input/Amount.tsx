import React from 'react';
import { Text } from 'react-native';
import { Props } from './Base';
import Number from './Number';

import styles from './Base/styles';

const Amount: React.FC<Props> = (props) => {
  return (
    <Number
      {...props}
      suffix={<Text style={styles.numberPrefix}>Rwf</Text>}
    />
  );
};

export default Amount;
