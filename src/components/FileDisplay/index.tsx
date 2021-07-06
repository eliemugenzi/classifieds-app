import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Typography from '@app/components/Typography';
import Icon from '@app/components/Icon';

interface Props {
  onClose?: () => void;
  fileName: string;
}

import styles from './styles';

const FileDisplay: React.FC<Props> = ({ onClose, fileName }) => {
  return (
    <View style={styles.fileWrapper}>
      <Typography.Text style={styles.fileName}>
        {fileName}
      </Typography.Text>
      <TouchableOpacity onPress={onClose}>
        <Icon name="X" />
      </TouchableOpacity>
    </View>
  );
};

export default FileDisplay;
