/*
 * Component: Pin
 * Created At: 2020-10-07 15:24:28
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Base, { Props } from './Base';
import Icon from '@app/components/Icon';

import style from './Base/styles';

const Pin: React.FC<Props> = (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  return (
    <Base
      {...props}
      inputProps={{
        keyboardType: 'number-pad',
        secureTextEntry,
        maxLength: 5,
      }}
      suffix={
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Icon
            name={secureTextEntry ? 'Eye' : 'EyeOff'}
            color={style.placeholder.color}
            size={15}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default Pin;
