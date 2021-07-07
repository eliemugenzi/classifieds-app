import COLORS from '@app/utils/colors';
import dimensions from '@app/utils/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginHorizontal: dimensions.deviceWidth * 0.1,
    marginVertical: dimensions.deviceHeight * 0.05,
  },
});

export const detailStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: dimensions.deviceWidth * 0.1,
    marginVertical: dimensions.deviceHeight * 0.01,
  },
  image: {
    marginVertical: 10,
    width: '100%',
    height: 100,
  },
  description: {
    marginVertical: 10,
    color: COLORS.darkerGray,
  },
  rowItem: {
    flexDirection: 'row',
  },
  rowText: {
    marginLeft: 10,
  },
  mv: {
    marginVertical: 10,
  },
});
