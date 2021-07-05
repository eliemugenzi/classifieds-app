import React, { ReactElement } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Icon from '../Icon';
import { headerStyles as styles } from './styles';

export interface ModalHeaderProps {
  title?: string | ReactElement;
  closable?: boolean;
  onClose?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  closable,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {closable && (
        <TouchableOpacity style={styles.icon} onPress={onClose}>
          <Icon name="X" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModalHeader;
