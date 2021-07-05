import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { capitalize } from 'lodash';
import moment from 'moment';
import validator from 'validator';

import Base from './Base';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';

import dimensions from '@app/utils/dimensions';
import COLORS from '@app/utils/colors';

const width = dimensions.deviceWidth - dimensions.padding * 4;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  header: {
    height: width * 0.3,
    backgroundColor: COLORS.primary,
    paddingHorizontal: dimensions.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  currDate: {
    color: COLORS.white,
    fontSize: width * 0.3 * 0.3,
  },
  label: { color: COLORS.white },
  content: { overflow: 'hidden' },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dimensions.padding * 2,
    marginHorizontal: dimensions.padding,
  },
  timeRowInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.09)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  input: {
    width: dimensions.padding * 5,
    textAlign: 'center',
    padding: dimensions.padding,
    color: COLORS.black,
  },
  invalid: {
    borderColor: COLORS.red,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: dimensions.padding,
  },
  disabled: {
    opacity: 0.5,
  },
});

const validate = (t: any) => {
  if (
    typeof t === 'string' &&
    t.length === 5 &&
    t.charAt(2) === ':'
  ) {
    if (
      !validator.isNumeric(t.charAt(0)) ||
      !validator.isNumeric(t.charAt(1)) ||
      !validator.isNumeric(t.charAt(3)) ||
      !validator.isNumeric(t.charAt(4))
    ) {
      return false;
    }
    if (Number(t.charAt(0)) * 1 > 2) {
      return false;
    }
    if (
      Number(t.charAt(0)) * 1 === 2 &&
      Number(t.charAt(1)) * 1 > 4
    ) {
      return false;
    }
    if (Number(t.charAt(3)) * 1 > 5) {
      return false;
    }
    return true;
  }
  return false;
};

interface Props {
  value?: string;
  onValueChange?: (v: any) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  listItem?: boolean;
  disableMinutes?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  width?: string | number;
}

const TimeInput: React.FC<Props> = ({
  value = '00:00',
  onValueChange,
  label,
  placeholder,
  disabled = false,
  disableMinutes = false,
  inputStyle,
  ...props
}) => {
  const [_open, set_open] = useState(false);
  const [_value, set_value] = useState(
    validate(value)
      ? value
      : (disableMinutes
          ? moment().set('minutes', 0)
          : moment()
        ).format('HH:mm'),
  );
  const [hours, setHours] = useState(_value.split(':')[0]);
  const [minutes, setMinutes] = useState(_value.split(':')[1]);

  useEffect(() => {
    set_value(
      validate(value)
        ? value
        : (disableMinutes
            ? moment().set('minutes', 0)
            : moment()
          ).format('HH:mm'),
    );
  }, [disableMinutes, value]);

  const open = () => {
    set_open(true);
    const v = validate(value)
      ? value
      : (disableMinutes
          ? moment().set('minutes', 0)
          : moment()
        ).format('HH:mm');
    set_value(v);
    setHours(v.split(':')[0]);
    setMinutes(v.split(':')[1]);
  };
  return (
    <>
      <TouchableOpacity
        key="TimeInputTrigger"
        disabled={disabled}
        onPress={() => open()}
        style={[props.style, { width: props.width }]}>
        <Base
          value={value}
          disabled={disabled}
          hasError={!validate(value)}
          label={label}
          placeholder={placeholder}
          inputWrapperStyle={inputStyle}
          inputProps={{
            pointerEvents: 'none',
            editable: false,
          }}
          suffix={
            <Icon
              name="Clock"
              color={disabled ? COLORS.gray : COLORS.primary}
              size={dimensions.padding}
            />
          }
          {...props}
        />
      </TouchableOpacity>
      <Modal
        key="TimeInputModal"
        visible={_open}
        toggleVisibility={(v) => set_open(!v)}
        onClose={() => set_open(false)}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.currDate}>{_value}</Text>
            {label && (
              <Text style={styles.label}>{capitalize(label)}</Text>
            )}
          </View>
          <View style={styles.content}>
            <View style={styles.timeRow}>
              <View
                style={[
                  styles.timeRowInner,
                  !validate(_value) && styles.invalid,
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="HH"
                  keyboardType="number-pad"
                  value={hours}
                  onChangeText={(v) => {
                    const vv = validator.isNumeric(v) ? Number(v) : 0;
                    const mm = validator.isNumeric(minutes)
                      ? Number(minutes)
                      : 0;
                    setHours(v);
                    set_value(
                      `${vv !== 0 && vv > 9 ? vv : `0${vv}`}:${
                        mm !== 0 && mm > 9 ? mm : `0${mm}`
                      }`,
                    );
                  }}
                />
                <Text>:</Text>
                <TextInput
                  style={[
                    styles.input,
                    disableMinutes && styles.disabled,
                  ]}
                  placeholder="MM"
                  keyboardType="number-pad"
                  editable={!disableMinutes}
                  onChangeText={(v) => {
                    const vv = validator.isNumeric(v) ? Number(v) : 0;
                    const hh = validator.isNumeric(hours)
                      ? Number(hours)
                      : 0;
                    setMinutes(v);
                    set_value(
                      `${hh !== 0 && hh > 9 ? hh : `0${hh}`}:${
                        vv !== 0 && vv > 9 ? vv : `0${vv}`
                      }`,
                    );
                  }}
                  value={minutes}
                />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              onPress={() => set_open(false)}
              size="small"
              style={{ marginHorizontal: 10 }}>
              Cancel
            </Button>
            <Button
              size="small"
              disabled={!validate(_value)}
              onPress={() => {
                if (value !== _value) {
                  onValueChange?.(_value);
                }

                set_open(false);
              }}>
              OK
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TimeInput;
