import React from 'react';
import { ActivityIndicator } from 'react-native';

import styles from './styles';

const Loader: React.FC<{}> = () => {
  return <ActivityIndicator style={styles.wrapper} />;
};

export default Loader;
