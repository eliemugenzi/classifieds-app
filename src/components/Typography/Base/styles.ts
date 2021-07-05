import { StyleSheet, Platform } from 'react-native';

const isIos = Platform.OS === 'ios';

export type BaseType =
  | 'plain'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger';

export default ({ level = 1 }: { level?: number }) =>
  StyleSheet.create({
    boldedText: {
      fontFamily: 'Mulish-Bold',
    },
    regularText: {
      fontFamily: isIos ? 'Mulish-Medium' : 'Mulish',
    },
    text: {
      //   color: colors.typography[type].color,
      fontSize: 14,
    },
    paragraph: {
      width: '100%',
      marginBottom: 15,
    },
    title: {
      fontSize:
        level === 1 ? 24 : level === 2 ? 21 : level === 3 ? 18 : 15,
    },
    strong: {},
  });
