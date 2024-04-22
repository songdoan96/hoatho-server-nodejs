import {StyleSheet} from 'react-native';
import theme from '../themes';
import {normalize} from '../utils/normalize';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACK_GROUND,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  formGroup: {width: '100%', marginBottom: 14},
  1: {
    marginBottom: 4,
    fontSize: theme.SIZES.INPUT_LABEL_TEXT,
    color: theme.COLORS.BLACK,
  },
  formLabel: {
    fontWeight: '500',
    fontSize: theme.SIZES.INPUT_LABEL_TEXT,
    marginBottom: theme.SIZES.INPUT_MARGIN_BOTTOM,
  },
  formControl: {
    color: theme.COLORS.INPUT,
    fontSize: theme.SIZES.INPUT_TEXT,
    textDecorationColor: 'transparent',
    textShadowColor: 'transparent',
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: theme.SIZES.INPUT_BORDER_RADIUS,
    borderWidth: theme.SIZES.INPUT_BORDER_WIDTH,
    borderColor: theme.COLORS.INPUT,
    height: theme.SIZES.INPUT_HEIGHT,
    paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL,
    width: '100%',
    marginBottom: 4,
  },
  formError: {
    color: theme.COLORS.DARK_DANGER,
    fontSize: theme.SIZES.INPUT_LABEL_TEXT,
  },
  heading: {
    fontSize: normalize(30),
    textTransform: 'uppercase',
    marginBottom: 20,
    color: theme.COLORS.BLACK,
  },
  // Button
  btn: {
    borderRadius: 4,
    width: theme.SIZES.BUTTON_WIDTH,
    height: theme.SIZES.BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  btnText: {
    fontSize: theme.SIZES.FONT,
    color: theme.COLORS.WHITE,
  },
});
