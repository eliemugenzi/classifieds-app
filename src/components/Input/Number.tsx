import React from 'react';
import numeral from 'numeral';
import Base, { Props as BP } from './Base';

const Number: React.FC<BP> = (props) => {
  return (
    <Base
      {...props}
      inputProps={{ keyboardType: 'decimal-pad' }}
      hasError={
        `${props.value}`.length > 0 &&
        !numeral(props.value).value() &&
        numeral(props.value).value() !== 0
      }
      format={(value) => {
        return numeral(value).value() && !`${value}`.endsWith('.')
          ? numeral(props.value).format('0,0.[00000000]')
          : value;
      }}
      parse={(value) => {
        return numeral(value).value() && !`${value}`.endsWith('.')
          ? `${numeral(value).value()}`
          : value;
      }}
    />
  );
};

export default Number;
