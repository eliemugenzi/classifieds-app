import React, { ReactElement } from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import COLORS from '@app/utils/colors';
import styles from './styles';

export interface CardProps {
  header?: ReactElement | ReactElement[] | null;
  footer?: ReactElement | ReactElement[] | null;
  children?: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  onLayout?: (v: any) => void;
}

const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  style,
  onPress,
  onLongPress,
  contentStyle,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS.white,
          elevation: 10,
        },
        style,
      ]}
      {...rest}>
      <TouchableOpacity
        disabled={!(onPress || onLongPress)}
        onPress={onPress}
        onLongPress={onLongPress}
        style={contentStyle}
        onLayout={rest.onLayout}>
        <View style={styles.innerContainer}>
          {header && <View style={styles.header}>{header}</View>}
          <>{children}</>
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
