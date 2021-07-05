import COLORS from '@app/utils/colors';
import dimensions from '@app/utils/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginVertical: dimensions.deviceHeight * 0.05,
    marginHorizontal: dimensions.deviceWidth * 0.1,
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 15,
    alignSelf: 'center',
    borderRadius: 15,
  },
  form: {
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
  },
  hyperLink: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  helperText: {
    flexDirection: 'row',
  },
  hyperLinkText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
});
