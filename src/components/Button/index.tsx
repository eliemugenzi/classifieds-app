import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import styles, { ButtonSizes, ButtonTypes } from './styles';
import Icon from '../Icon';
import componentDimensions from '@app/utils/dimensions/component';
import { IconsNames } from '../Icon/icons';

export interface Props {
  block?: boolean;
  style?: StyleProp<ViewStyle>;
  type?: keyof typeof ButtonTypes;
  size?: keyof typeof ButtonSizes;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconsNames;
  children?:
    | string
    | string[]
    | React.ReactElement
    | React.ReactElement[];
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const BaseButton: React.FC<Props> = ({
  style,
  block,
  size = 'medium',
  type = 'plain',
  loading = false,
  disabled = false,
  icon,
  children,
  onPress,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles(type, size).wrapper,
        block && styles(type, size).block,
        componentDimensions.button[size],
        disabled && styles(type, size).disabled,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            disabled
              ? styles(type, size).disabled.color
              : styles(type, size).wrapper.color
          }
        />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              size={styles(type, size).text.fontSize}
              color={styles(type, size).text.color}
              style={{
                marginHorizontal: 25,
              }}
            />
          )}
          <Text
            numberOfLines={1}
            style={[
              styles(type, size).text,
              icon !== undefined && styles(type, size).icon,
              disabled && styles(type, size).disabled,
              textStyle,
            ]}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default BaseButton;
