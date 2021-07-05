import { StyleSheet } from 'react-native';
import COLORS from '@app/utils/colors';
import dimensions from '@app/utils/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
    alignSelf: 'center',
    width: '100%',
    color: COLORS.black,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});

export const actionsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: dimensions.deviceWidth * 0.35,
  },
});
