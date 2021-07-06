import COLORS from '@app/utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },
  name: {
    fontSize: 15,
    marginTop: 5,
  },
  description: {
    color: COLORS.darkerGray,
    marginVertical: 7,
  },
  subItem: {
    flexDirection: 'row',
  },
  subItemText: {
    marginLeft: 10,
  },
});
