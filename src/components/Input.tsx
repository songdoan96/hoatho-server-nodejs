import {Eye, EyeSlash} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../themes';
interface InputProps {
  password?: boolean;
  viewPass?: boolean;
  rounded?: boolean;
  borderless?: boolean;
  disable?: boolean;
  onChangeText?: () => void;
  value?: string | undefined | any;
  bgColor?: string;
  color?: string;
  placeholder?: string;
  error?: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  type?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
}
const Input = ({
  password,
  onChangeText,
  viewPass,
  value,
  bgColor,
  type = 'default',
  rounded,
  borderless,
  error,
  style,
  placeholder,
  label,
  disable,
  ...rest
}: InputProps) => {
  const [isPassword, setIsPassword] = useState(false);
  useEffect(() => {
    password && setIsPassword(password);
  }, [password]);

  const viewPassElement = password && viewPass && (
    <TouchableOpacity
      style={{marginLeft: 2}}
      activeOpacity={1}
      onPress={() => setIsPassword(!isPassword)}>
      {isPassword ? <Eye color="red" /> : <EyeSlash color="red" />}
    </TouchableOpacity>
  );
  const inputViewStyles = [
    styles.inputStyle,
    styles.inputContainer,
    bgColor && {backgroundColor: bgColor},
    rounded && styles.rounded,
    borderless && styles.borderless,
    error && {borderColor: theme.COLORS.DANGER},
    style,
  ];
  const inputStyles = [
    styles.inputView,
    // borderless && icon && styles.inputIcon,
    styles.inputText,
    // color && {color},
    // textInputStyle || {}
  ];

  return (
    <View
      style={{
        marginVertical: theme.SIZES.BASE / 4,
        alignContent: 'center',
      }}>
      {/* {labelContent} */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* {topHelp && !bottomHelp && helpContent} */}
      <View style={inputViewStyles} pointerEvents={disable ? 'none' : 'auto'}>
        {/* {left && !right && iconInstance} */}
        <TextInput
          //   ref={onRef}
          style={inputStyles}
          keyboardType={type}
          secureTextEntry={isPassword}
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
        {/* {right && iconInstance} */}
        {viewPassElement}
      </View>
      {error && <Text style={styles.helpText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: theme.SIZES.INPUT_BORDER_RADIUS,
    borderWidth: theme.SIZES.INPUT_BORDER_WIDTH,
    borderColor: theme.COLORS.INPUT,
    height: theme.SIZES.INPUT_HEIGHT,
    paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL,
    width: '100%',
  },
  inputText: {
    color: theme.COLORS.INPUT,
    fontSize: theme.SIZES.INPUT_TEXT,
    textDecorationColor: 'transparent',
    textShadowColor: 'transparent',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    flex: 1,
  },
  inputIcon: {
    marginHorizontal: theme.SIZES.BASE,
  },
  label: {
    fontWeight: '500',
    fontSize: theme.SIZES.INPUT_LABEL_TEXT,
    marginVertical: theme.SIZES.INPUT_VERTICAL_LABEL,
    // paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL,
  },
  helpText: {
    color: theme.COLORS.DANGER,
    fontSize: theme.SIZES.INPUT_HELP_TEXT,
    marginTop: 8,
    // paddingHorizontal: 16,
  },
  rounded: {
    borderRadius: theme.SIZES.INPUT_ROUNDED,
  },
  borderless: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
});
