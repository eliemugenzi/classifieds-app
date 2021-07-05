import React from 'react';
import Modal from '@app/components/Modal';
import Base, { BaseProps as BP } from './Base';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from '@app/components/Icon';
import _styles from './Base/styles';
import Typography from '@app/components/Typography';

import COLORS from '@app/utils/colors';

export interface OptionProp {
  label: string;
  value: any;
}
export interface SelectProps extends BP {
  value?: any;
  onChange?: (value: any) => void;
  options: OptionProp[];
  children?: React.ReactElement;
  scrollable?: boolean;
  modalStyle?: StyleProp<ViewStyle>;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  disabled,
  children,
  ...props
}) => {
  const styles = _styles;
  const [selected, setSelected] = React.useState<any>('');
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const label = options.reduce(
    (pv, cv) => (cv.value === selected ? cv.label : pv),
    '',
  );

  const Wrapper = props.scrollable ? ScrollView : View;

  return (
    <>
      <Modal
        visible={show}
        toggleVisibility={setShow}
        style={props.modalStyle}
        closable
        title={props.label}>
        <Wrapper>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.select}
              onPress={() => {
                setSelected(option.value);
                if (onChange) onChange(option.value);
                setShow(false);
              }}>
              <View style={styles.selectInner}>
                <Typography style={styles.selectLabel}>
                  {option.label}
                </Typography>
              </View>
              {selected === option.value && (
                <Icon name="Check" color={COLORS.blue} />
              )}
            </TouchableOpacity>
          ))}
        </Wrapper>
      </Modal>
      {children ? (
        React.cloneElement(children, { onPress: () => setShow(true) })
      ) : (
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{ width: '100%' }}>
          <Base
            {...props}
            selectable
            disabled={disabled || !options || options.length === 0}
            value={label}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default Select;
