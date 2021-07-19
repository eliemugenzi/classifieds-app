/*
 * Component: PhoneNumber
 * Created At: 2020-10-07 11:32:39
 */

import React from 'react';
import phone from '@exuus/rwanda-phone-utils';

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
        !phone(props?.value).isValid
      }
      value={
        phone(props.value as string).isValid
          ? (phone(props.value as string).short as string)
          : props.value
      }
      onChange={(value) => {
        if (props.onChange)
          phone(value).isValid
            ? props.onChange(phone(value).unformatted as string)
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
