import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import RNModal from 'react-native-modal';
import ModalActions, { ModalActionsProps } from './ModalActions';
import ModalHeader, { ModalHeaderProps } from './ModalHeader';
import Card from '../Card';
import COLORS from '@app/utils/colors';
import dimensions from '../../utils/dimensions';
import styles from './styles';

export interface ModalProps
  extends ModalHeaderProps,
    ModalActionsProps {
  onClose?: () => void;
  dismissible?: boolean;
  visible: boolean;
  toggleVisibility: (visible: boolean) => void;
  children: React.ReactElement | React.ReactElement[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  avoidKeyboard?: boolean;
}

const ANIMATION_TIMING = 500;

const Modal: React.FC<ModalProps> = ({
  visible,
  toggleVisibility,
  children,
  style,
  contentStyle,
  avoidKeyboard = false,
  title,
  ...rest
}) => {
  const { closable, actions = [], onClose } = rest;

  const closeModal = () => {
    if (onClose) onClose();
    toggleVisibility(false);
  };

  return (
    <RNModal
      isVisible={visible}
      backdropColor={COLORS.backdrop}
      backdropOpacity={0.4}
      onBackButtonPress={closeModal}
      style={style}
      avoidKeyboard={avoidKeyboard}
      animationInTiming={ANIMATION_TIMING}
      animationOutTiming={ANIMATION_TIMING}
      backdropTransitionInTiming={ANIMATION_TIMING}
      backdropTransitionOutTiming={ANIMATION_TIMING}
      deviceHeight={dimensions.deviceHeight}
      deviceWidth={dimensions.deviceWidth}>
      <Card
        header={
          title ? (
            <ModalHeader
              title={title}
              closable={closable}
              onClose={closeModal}
            />
          ) : null
        }
        footer={
          actions.length > 0 ? (
            <ModalActions
              actions={actions}
              actionsContainerStyles={rest.actionsContainerStyles}
            />
          ) : null
        }>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Card>
    </RNModal>
  );
};

export default Modal;
