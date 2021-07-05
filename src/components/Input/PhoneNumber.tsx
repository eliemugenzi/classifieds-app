/*
 * Component: PhoneNumber
 * Created At: 2020-10-07 11:32:39
 */

import React from 'react';
import { short, isValid, normalize } from 'rwanda-phone-utils';

import Base, { Props } from './Base';
import styles from './Base/styles';

import Typography from '../Typography';

const PhoneNumber: React.FC<Props> = (props) => {
  return (
    <Base
      {...props}
      inputProps={{ keyboardType: 'phone-pad' }}
      hasError={
        typeof props.value === 'string' &&
        props.value.length > 0 &&
        !isValid(props.value)
      }
      value={isValid(props.value) ? short(props.value) : props.value}
      onChange={(value) => {
        if (props.onChange)
          isValid(value)
            ? props.onChange(normalize(value))
            : props.onChange(value);
      }}
      prefix={
        <Typography.Text style={styles.numberPrefix}>
          +250
        </Typography.Text>
      }
    />
  );
};

export default PhoneNumber;
