import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import moment from 'moment';
import validator from 'validator';

import dimensions from '../../utils/dimensions';
import Input from './Base';
import Modal from '../Modal';
import COLORS from '@app/utils/colors';
import Icon from '../Icon';
import Button from '../Button';

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
  label: {
    color: COLORS.white,
  },
  content: {
    overflow: 'hidden',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  timeRowInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  input: {
    width: dimensions.padding * 5,
    textAlign: 'center',
    padding: dimensions.padding,
    color: COLORS.black,
    backgroundColor: COLORS.white,
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
  return moment(t).isValid();
};

const ddd = (d: any) => {
  return validate(d)
    ? moment(d).format('YYYY-MM-DD')
    : moment().format('YYYY-MM-DD');
};

const num = (n: any, t = false) => {
  const nn = validator.isNumeric(n) ? n * 1 : 0;

  if (t) {
    return `${nn !== 0 && nn > 9 ? '' : '0'}${nn}`;
  }

  return nn;
};

interface Props {
  value?: any;
  onValueChange?: (v: any) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  listItem?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  width?: string | number;
}

const DateInput: React.FC<Props> = ({
  value,
  onValueChange,
  label,
  placeholder,
  disabled = false,
  listItem,
  inputStyle,
  ...props
}) => {
  const [_open, set_open] = useState(false);
  const [_value, set_value] = useState(ddd(value));
  const [year, setYear] = useState(_value.split('-')[0]);
  const [month, setMonth] = useState(_value.split('-')[1]);
  const [day, setDay] = useState(_value.split('-')[2]);

  useEffect(() => {
    set_value(ddd(value));
  }, [value]);

  const open = () => {
    set_open(true);

    const v = ddd(value);
    setYear(v.split('-')[0]);
    setMonth(v.split('-')[1]);
    setDay(v.split('-')[2]);
  };

  return (
    <>
      <TouchableOpacity
        key="DateInputTrigger"
        disabled={disabled || listItem}
        onPress={() => open()}
        style={[props.style, { width: props.width }]}>
        <Input
          value={moment(value).format('MMM D, YYYY')}
          disabled={disabled}
          hasError={
            ![null, '', undefined].includes(value) && !validate(value)
          }
          label={label}
          inputWrapperStyle={inputStyle}
          inputProps={{
            pointerEvents: 'none',
            editable: false,
          }}
          suffix={
            <Icon
              name="Calendar"
              size={dimensions.padding}
              color={COLORS.primary}
            />
          }
          {...props}
        />
      </TouchableOpacity>
      <Modal
        key="DateInputModal"
        visible={_open}
        onClose={() => {
          set_open(false);
        }}
        closable
        toggleVisibility={() => set_open(false)}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.currDate}>
              {moment(_value).format('MMM D, YYYY')}
            </Text>
            {!['', null, undefined].includes(label) && (
              <Text style={styles.label}>{label}</Text>
            )}
          </View>
          <View style={styles.content}>
            <View style={styles.timeRow}>
              <View
                style={[
                  styles.timeRowInner,
                  validate(_value) ? {} : styles.invalid,
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY"
                  keyboardType="number-pad"
                  value={year}
                  onChangeText={(v) => {
                    setYear(v);
                    set_value(
                      `${num(v, true)}-${num(month, true)}-${num(
                        day,
                        true,
                      )}`,
                    );
                  }}
                />
                <Text style={{ backgroundColor: COLORS.white }}>
                  /
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM"
                  keyboardType="number-pad"
                  value={month}
                  onChangeText={(v) => {
                    setMonth(v);
                    set_value(
                      `${num(year, true)}-${num(v, true)}-${num(
                        day,
                        true,
                      )}`,
                    );
                  }}
                />
                <Text style={{ backgroundColor: COLORS.white }}>
                  /
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD"
                  keyboardType="number-pad"
                  value={day}
                  onChangeText={(v) => {
                    setDay(v);
                    set_value(
                      `${num(year, true)}-${num(month, true)}-${num(
                        v,
                        true,
                      )}`,
                    );
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <>
              <Button
                size="small"
                onPress={() => {
                  set_open(false);
                }}
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
            </>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateInput;
