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
});
