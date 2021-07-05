import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import { FormikErrors } from 'formik';

import colors from '@app/utils/colors';
import Dimensions from '@app/utils/dimensions';
import Icon from '../../Icon';
import Typography from '@app/components/Typography';

import styles from './styles';

interface WrapperProps {
  children: React.ReactNode;
  onPress?: () => void;
  _styles: any;
  style: any;
  disabled?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  onPress,
  disabled = false,
  _styles,
  style,
}) =>
  onPress ? (
    <TouchableOpacity style={[disabled && _styles.disabled, style]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[disabled && _styles.disabled, style]}>
      {children}
    </View>
  );

export interface BaseProps {
  inputRef?: React.RefObject<TextInput>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
  disabled?: boolean;
  hasError?: boolean;
  placeholder?: string;
  label?: string;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  onPress?: () => void;
  format?: (value: string) => string;
  parse?: (value: string) => string;
  hyphened?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  maxLength?: number;
  selectable?: boolean;
}

export interface Props extends BaseProps {
  value?: string | number;
  onChange?: (value: string) => void;
}

const BaseTextInput: React.FC<Props> = ({
  inputRef,
  style,
  labelStyle,
  inputStyle,
  inputWrapperStyle,
  inputProps,
  disabled = false,
  hasError,
  placeholder,
  label,
  prefix,
  suffix,
  value,
  onChange,
  onPress,
  format = (v) => v,
  parse = (v) => v,
  error,
  maxLength,
  selectable = false,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const [_value, setValue] = useState<string | number>(value || '');

  useEffect(() => {
    setValue(value || '');
  }, [value]);

  const handleChange = (text = '') => {
    if (onChange) onChange(parse(text));
    setValue(parse(text));
  };

  return (
    <Wrapper
      onPress={onPress}
      disabled={disabled}
      style={style}
      _styles={styles}>
      {label && (
        <Typography.Text style={[styles.label, labelStyle]}>
          {label}
        </Typography.Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          _value?.toString()?.length !== 0 && styles.inputNotEmpty,
          _value?.toString()?.length !== 0 &&
            !focused &&
            styles.inputNotEmptyNotFocused,
          focused && styles.inputWrapperFocused,
          hasError && styles.inputWrapperError,
        ]}>
        {prefix}
        <TextInput
          {...inputProps}
          ref={inputRef}
          value={format(_value.toString())}
          onChangeText={handleChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          editable={
            onPress
              ? false
              : inputProps && inputProps.editable !== undefined
              ? inputProps.editable
              : !disabled
          }
          style={[
            styles.input,
            _value?.toString()?.length === 0 && styles.inputEmpty,
            inputStyle,
          ]}
          placeholderTextColor={styles.placeholder.color}
          selectionColor={styles.input.color}
        />
        {selectable && (
          <Icon
            name="ChevronDown"
            color={colors.darkGray}
            size={Dimensions.padding / 1.2}
          />
        )}
        {suffix}
      </View>
      {error && (
        <Typography.Text style={styles.error}>
          {error}
        </Typography.Text>
      )}
    </Wrapper>
  );
};

export default BaseTextInput;
