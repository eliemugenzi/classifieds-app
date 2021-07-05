import COLORS from '@app/utils/colors';
import dimensions from '@app/utils/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginHorizontal: dimensions.deviceWidth * 0.1,
    marginVertical: dimensions.deviceHeight * 0.05,
  },
  form: {
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
  },
  helperWrapper: {
    flexDirection: 'row',
  },
  hyperLink: {
    marginLeft: 20,
  },
  helperText: {
    textDecorationLine: 'underline',
    color: COLORS.primary,
  },
});
