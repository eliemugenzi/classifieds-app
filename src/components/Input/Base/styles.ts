import { StyleSheet, Platform } from 'react-native';
import colors from '@app/utils/colors';
import componentDimensions from '@app/utils/dimensions/component';
import dimensions from '@app/utils/dimensions';

const isandrid = Platform.OS === 'android';

export default StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.black,
    fontSize: componentDimensions.textInput.fontSize,
    lineHeight: componentDimensions.textInput.lineHeight,
    marginBottom: componentDimensions.textInput.labelMargin,
  },
  inputWrapper: {
    height: componentDimensions.textInput.height,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: componentDimensions.textInput.horizontalMargin,
    borderRadius: componentDimensions.textInput.borderRadius,
    borderWidth: componentDimensions.textInput.borderWidth,
    borderColor: colors.gray,
    backgroundColor: '#F7F7F7',
  },
  textAreaInputWrapper: {
    height: componentDimensions.textInput.textAreaHeight,
  },
  inputWrapperError: {
    borderColor: colors.red,
  },
  inputWrapperFocused: {
    borderColor: colors.inputFocusedBorderColor,
    backgroundColor: colors.inputFocusedBgColor,
  },
  input: {
    color: colors.black,
    fontSize: componentDimensions.textInput.fontSize,
    fontWeight: 'bold',
    height:
      componentDimensions.textInput.textAreaHeight -
      componentDimensions.textInput.verticalMargin,
    flex: 1,
    ...(isandrid ? { padding: 0, margin: 0, borderWidth: 0 } : {}),
    fontFamily: 'Mulish',
  },
  textareaInput: {
    height:
      componentDimensions.textInput.textAreaHeight -
      componentDimensions.textInput.verticalMargin,
  },
  inputEmpty: {
    fontWeight: '400',
  },
  inputNotEmpty: {
    backgroundColor: colors.white,
  },
  inputNotEmptyNotFocused: {
    borderColor: colors.inputFocusedBorderColor,
  },
  placeholder: {
    color: colors.black,
  },
  numberPrefix: {
    color: colors.darkerGray,
    fontSize: componentDimensions.textInput.fontSize,
    paddingRight: componentDimensions.textInput.phonePrefixMargin,
  },
  error: {
    fontSize: 10,
    color: colors.red,
  },
  search: {
    height: 56,
  },
  searchBack: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  select: {
    paddingVertical: dimensions.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectInner: {
    flex: 1,
  },
  selectLabel: {
    color: colors.black,
  },
  selectSubtitle: {
    color: colors.darkGray,
    fontSize: 10,
  },
  iconSelect: {
    flexDirection: 'row',
  },
  optionIcon: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 30,
  },
});
