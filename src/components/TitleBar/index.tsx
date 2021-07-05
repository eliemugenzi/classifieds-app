import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Typography from '../Typography';
import Icon from '../Icon';

import styles from './styles';

interface Props {
  title: string;
  subTitle?: string;
  hasBack?: boolean;
}

const TitleBar: React.FC<Props> = ({
  title,
  subTitle,
  hasBack = true,
}) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.wrapper}>
      {hasBack && (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="ArrowLeft" />
        </TouchableOpacity>
      )}
      <View style={styles.titleWrapper}>
        <Typography.Title level={4} style={styles.title}>
          {title}
        </Typography.Title>
        {subTitle && <Typography.Text>{subTitle}</Typography.Text>}
      </View>
    </View>
  );
};

export default TitleBar;
