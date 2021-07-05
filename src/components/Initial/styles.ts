import COLORS from '@app/utils/colors';
import dimensions from '@app/utils/dimensions';
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    height: dimensions.padding * 2,
    width: dimensions.padding * 2,
    borderRadius: dimensions.padding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'android' ? 'bold' : '800',
    fontSize: dimensions.padding * 0.65,
  },
});
