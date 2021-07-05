import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Button from '../Button';
import { ButtonSizes, ButtonTypes } from '../Button/styles';
import { actionsStyles as styles } from './styles';

interface SingleAction {
  title: string;
  onPress?: () => void;
  type?: keyof typeof ButtonTypes;
  size?: keyof typeof ButtonSizes;
  block?: boolean;
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
}

export interface ModalActionsProps {
  actions?: Array<SingleAction>;
  actionsContainerStyles?: StyleProp<ViewStyle>;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  actions = [],
  actionsContainerStyles,
}) => {
  return (
    <View style={[styles.container, actionsContainerStyles]}>
      {actions.map((action: SingleAction, index: number) => (
        <Button
          key={index}
          style={[styles.button, action.style]}
          type={action.type || 'danger'}
          size={action.size || 'small'}
          onPress={action.onPress}
          block={action.block}
          loading={action.loading}
          disabled={action.disabled}>
          {action.title}
        </Button>
      ))}
    </View>
  );
};

export default ModalActions;
