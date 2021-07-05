import { Dimensions, Platform } from 'react-native';
import colors from '@app/utils/colors';

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get(
  'window',
);

const shadow = {
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 20,
};

const dimensions = {
  shadow,
  deviceHeight: DEVICE_HEIGHT,
  deviceWidth: DEVICE_WIDTH,
  padding: 24,
  quickMenuHeight: 80,
  tabHeight: 64,
  margin: 15,
  smPadding: 5,
  bold: Platform.select({ ios: '800', android: 'bold' }),
};

export default dimensions;
