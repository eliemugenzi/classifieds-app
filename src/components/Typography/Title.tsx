/*
 * Component: Title
 * Created At: 2020-10-13 13:09:50
 */

import React from 'react';
import Base, { Props } from './Base';

import styles from './Base/styles';

interface TitleProps extends Props {
  level?: 1 | 2 | 3 | 4;
}

const Title: React.FC<TitleProps> = ({
  style,
  level = 1,
  ...props
}) => {
  const styles_ = styles({ level });
  return <Base {...props} style={[styles_.title, style]} />;
};

export default Title;
