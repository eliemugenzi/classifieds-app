import dimensions from '@app/utils/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginHorizontal: dimensions.deviceWidth * 0.1,
    flexDirection: 'row',
    marginVertical: 20,
  },
  titleWrapper: {
    marginLeft: 20,
  },
  title: {
    marginBottom: 5,
  },
});
