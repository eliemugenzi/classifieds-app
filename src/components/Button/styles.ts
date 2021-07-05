import { StyleSheet } from 'react-native';
import dimensions from '@app/utils/dimensions';
import colors from '@app/utils/colors';

export enum ButtonTypes {
  'plain',
  'primary',
  'success',
  'danger',
}

export enum ButtonSizes {
  'medium',
  'small',
  'tiny',
}

export default (
  type: keyof typeof ButtonTypes,
  size?: keyof typeof ButtonSizes,
) => {
  const button: any = {
    plain: {
      backgroundColor: 'transparent',
      color: colors.darkerGray,
      borderColor: colors.darkGray,
      borderWidth: 1,
    },
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    success: {
      backgroundColor: colors.green,
      color: colors.white,
    },
    danger: {
      backgroundColor: colors.red,
      color: colors.white,
    },
  };
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: button[type].backgroundColor,
      ...button[type],
    },
    text: {
      fontSize: 14,
      color: button[type].color,
      fontWeight: '700',
    },
    icon: {
      marginLeft: dimensions.padding * 0.3,
    },
    block: {
      width: '100%',
    },
    disabled: {
      backgroundColor: colors.darkGray,
      color: colors.white,
    },
  });
};
