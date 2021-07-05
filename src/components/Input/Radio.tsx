import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import COLORS from '@app/utils/colors';
import dimensions from '../../utils/dimensions';

import Icon from '../Icon';
import Typography from '../Typography';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  disabled: {
    opacity: 0.3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: dimensions.padding,
    paddingVertical: dimensions.padding / 2,
  },
  icon: {
    marginRight: dimensions.padding / 4,
  },
  label: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
});

interface Option {
  label: string;
  value: any;
}

interface Props {
  options: Option[];
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Radio: React.FC<Props> = ({
  options,
  value: _value = null,
  onChange,
  disabled,
  horizontal = false,
  style,
}) => {
  const [value, setValue] = React.useState<any | null>(_value);

  React.useEffect(() => {
    if (_value && _value !== value) setValue(_value);
  }, [_value]);

  return (
    <View style={[styles.wrapper, disabled && styles.disabled]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.item}
          disabled={disabled}
          onPress={() => {
            if (!disabled) {
              setValue(option.value);
              if (onChange) onChange(option.value);
            }
          }}>
          <Icon
            name={option.value === value ? 'CheckCircle' : 'Circle'}
            size={18}
            color={
              option.value === value
                ? COLORS.lightBlue
                : COLORS.darkerGray
            }
            style={styles.icon}
          />
          <Typography style={styles.label}>{option.label}</Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Radio;
