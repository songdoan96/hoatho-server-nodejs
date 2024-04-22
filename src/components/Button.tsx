import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../themes';
export type ButtonColorType =
  | 'theme'
  | 'primary'
  | 'info'
  | 'danger'
  | 'warning'
  | 'success'
  | 'black'
  | 'grey'
  | 'secondary'
  | 'transparent'
  | 'white';
interface ButtonProps {
  color?: ButtonColorType;
  children: string | React.JSX.Element;
  round?: boolean;
  loading?: boolean;
  disabled?: boolean;
  opacity?: number;
  loadingSize?: 'small' | 'large';
  loadingColor?: string;
  onPress?: () => void;
  style?: any;
}
const Button = ({
  children,
  color = 'primary',
  round,
  disabled,
  loading,
  loadingSize = 'small',
  loadingColor,
  opacity = 0.8,
  onPress,
  style,
  ...rest
}: ButtonProps) => {
  function renderContent() {
    let content = children;
    // if (loading) {
    //   return (
    //     <ActivityIndicator
    //       size={loadingSize}
    //       color={loadingColor || theme.COLORS.WHITE}
    //     />
    //   );
    // }
    return <Text style={styles.customText}>{content}</Text>;
  }

  const colorStyle = styles[color] || {backgroundColor: color};
  const buttonStyles = [
    styles.defaultButton,
    colorStyle,
    round && {borderRadius: theme.SIZES.BASE * 2},
  ];
  return (
    <TouchableOpacity
      disabled={disabled || (loading && !loading)}
      activeOpacity={opacity}
      style={[buttonStyles, style]}
      onPress={onPress}
      {...rest}>
      {loading && (
        <ActivityIndicator
          size={loadingSize}
          color={loadingColor || theme.COLORS.WHITE}
        />
      )}
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  defaultButton: {
    borderRadius: 4,
    width: theme.SIZES.BUTTON_WIDTH,
    height: theme.SIZES.BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    flexDirection: 'row',
    gap: 8,
  },
  shadow: {
    shadowColor: theme.COLORS.BLOCK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: theme.SIZES.OPACITY,
    shadowRadius: theme.SIZES.BUTTON_SHADOW_RADIUS,
  },
  customText: {
    fontSize: theme.SIZES.FONT,
    color: theme.COLORS.WHITE,
  },
  theme: {
    backgroundColor: theme.COLORS.THEME,
  },
  primary: {
    backgroundColor: theme.COLORS.PRIMARY,
  },
  info: {
    backgroundColor: theme.COLORS.INFO,
  },
  danger: {
    backgroundColor: theme.COLORS.DANGER,
  },
  warning: {
    backgroundColor: theme.COLORS.WARNING,
  },
  success: {
    backgroundColor: theme.COLORS.SUCCESS,
  },
  white: {
    backgroundColor: theme.COLORS.WHITE,
  },
  black: {
    backgroundColor: theme.COLORS.BLACK,
  },
  secondary: {
    backgroundColor: theme.COLORS.SECONDARY,
  },
  grey: {
    backgroundColor: theme.COLORS.GREY,
  },
  transparent: {
    backgroundColor: theme.COLORS.TRANSPARENT,
  },
  androidShadow: {
    elevation: theme.SIZES.ANDROID_ELEVATION,
  },
});
