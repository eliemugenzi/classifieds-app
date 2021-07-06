import COLORS from '@app/utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  fileWrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderColor: COLORS.darkerGray,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    alignContent: 'center',
  },
  fileName: {
    fontSize: 12,
    color: COLORS.darkerGray,
    alignSelf: 'center',
  },
});
