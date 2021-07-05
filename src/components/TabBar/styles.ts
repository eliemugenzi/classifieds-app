import { StyleSheet } from 'react-native';
import Color from 'color';
import COLORS from '@app/utils/colors';
import dimensions from '../../utils/dimensions';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: dimensions.padding,
    right: dimensions.padding,
    borderRadius: 0,
    backgroundColor: 'transparent',
    padding: 0,
    zIndex: 999,
    ...dimensions.shadow,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.darkerGray,
  },
  cardPadding: {
    padding: dimensions.padding,
    paddingTop: dimensions.padding * 2,
    paddingHorizontal: 0,
    margin: dimensions.padding,
  },
  wrapperContent: {
    paddingHorizontal: dimensions.padding,
  },
  tabStyle: {
    height: dimensions.padding * 1.08,
    marginVertical: dimensions.padding / 2,
    marginRight: dimensions.padding / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: dimensions.padding / 2,
    paddingBottom: 10,
  },
  tabStyleLast: {
    marginRight: 0,
  },
  tabStyleActive: {
    borderBottomColor: COLORS.blue,
    borderBottomWidth: 1,
  },
  labelStyle: {
    fontSize: 13,
    color: Color(COLORS.black).alpha(0.6).toString(),
    fontFamily: 'Mulish',
  },
  labelStyleActive: {
    color: COLORS.blue,
  },

  badge: {
    height: dimensions.padding * 0.6,
    width: dimensions.padding * 0.6,
    backgroundColor: COLORS.red,
    borderRadius: dimensions.padding * 0.3,
    position: 'absolute',
    top: dimensions.padding * -0.2,
    right: dimensions.padding * -0.2,
  },
});
