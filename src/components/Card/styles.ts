import { StyleSheet } from 'react-native';
import COLORS from '@app/utils/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 10,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  header: {
    marginBottom: 15,
  },
  footer: {
    marginTop: 15,
  },
  innerContainer: {
    padding: 15,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export const stylesTab = (tabSize: number = 0) =>
  StyleSheet.create({
    container: {},
    tabItem: {
      paddingVertical: 3,
      borderRadius: 4,
      marginRight: tabSize > 2 ? 0 : 7,
    },
    content: {
      marginVertical: 10,
    },
    scrollableContent: {
      paddingBottom: 20,
    },
    active: {
      paddingHorizontal: 10,
      backgroundColor: '#DFE7F5',
    },
    textActive: {
      fontWeight: '500',
      color: '#0047CC',
    },
  });
