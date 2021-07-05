/*
 * Component: Search
 * Created At: 2020-10-07 15:24:28
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Base, { Props } from './Base';
import Icon from '@app/components/Icon';

import styles from './Base/styles';

const Search: React.FC<Props> = ({ onChange, ...props }) => {
  const [value, setValue] = React.useState<string>('');
  return (
    <Base
      {...props}
      value={value}
      onChange={(v) => {
        if (onChange) onChange(v);
        setValue(v);
      }}
      inputWrapperStyle={[styles.search, props.inputWrapperStyle]}
      prefix={
        <TouchableOpacity
          disabled={value === ''}
          style={styles.searchBack}
          onPress={() => {
            if (onChange) onChange('');
            setValue('');
          }}>
          <Icon
            name={value === '' ? 'Search' : 'ArrowLeft'}
            color={styles.placeholder.color}
            size={24}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default Search;
