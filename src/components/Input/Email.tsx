import React from 'react';
import validator from 'validator';
import { View } from 'react-native';
import Base, { Props as BP } from './Base';

import Icon from '../Icon';

const Email: React.FC<BP> = (props) => {
  return (
    <Base
      {...props}
      inputProps={{
        keyboardType: 'email-address',
      }}
      hasError={
        !!(props.value && !validator.isEmail(`${props.value}`))
      }
      format={(value) => value.toLowerCase()}
      suffix={
        props.value && validator.isEmail(`${props.value}`) ? (
          <Icon name="Correct" />
        ) : (
          <View />
        )
      }
    />
  );
};

export default Email;
