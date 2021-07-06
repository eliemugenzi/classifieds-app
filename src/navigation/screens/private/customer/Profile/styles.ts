import COLORS from '@app/utils/colors';
import dimensions from '@app/utils/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginHorizontal: dimensions.deviceWidth * 0.1,
    marginVertical: dimensions.deviceHeight * 0.1,
  },
  input: {
    marginVertical: 10,
  },
});

export const userCardStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderIcon: {
    marginRight: 5,
  },
  profileInfoWrapper: {
    flexDirection: 'row',
  },
  userPhone: {
    color: COLORS.darkerGray,
    marginTop: 4,
  },
  ml10: {
    marginLeft: 10,
  },
});

export const settingsStyles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
  },
  actionTouchable: {
    marginVertical: 7,
  },
  actionWrapper: {
    marginVertical: 10,
  },
  input: {
    marginVertical: 10,
  },
});
