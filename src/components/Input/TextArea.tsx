/*
 * Component: TextArea
 * Created At: 2020-10-07 16:57:21
 */

import React from 'react';
import Base, { Props } from './Base';
import styles from './Base/styles';

const TextArea: React.FC<Props> = (props) => {
  return (
    <Base
      {...props}
      inputStyle={[styles.textareaInput, props.inputStyle]}
      inputWrapperStyle={[
        styles.textAreaInputWrapper,
        props.inputWrapperStyle,
      ]}
      inputProps={Object.assign(
        { multiline: true },
        props.inputProps || {},
      )}
    />
  );
};

export default TextArea;
