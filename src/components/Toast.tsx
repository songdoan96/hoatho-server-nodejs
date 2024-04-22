import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useToastStore from '../store/toastStore';
import theme from '../themes';

const Toast = () => {
  const {show, message, hideToast} = useToastStore();
  useEffect(() => {
    setTimeout(() => {
      hideToast();
    }, 2000);
  }, [hideToast, show]);

  const textStyles = [styles.text];
  return show ? (
    <View style={styles.toast}>
      <Text style={textStyles}>{message}</Text>
    </View>
  ) : null;
};

export default Toast;
const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    zIndex: 9999,
    left: 0,
    right: 0,
    bottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#fff',
    fontSize: theme.SIZES.TOAST_TEXT,
    padding: theme.SIZES.BASE * 0.75,
    color: theme.COLORS.BLACK,
    borderRadius: theme.SIZES.BASE * 2,
    borderWidth: 1,
    borderColor: '#000',
  },
  defaultColor: {
    backgroundColor: theme.COLORS.TOAST_BACKGROUND,
  },
  primaryColor: {
    backgroundColor: theme.COLORS.PRIMARY,
  },
  themeColor: {
    backgroundColor: theme.COLORS.THEME,
  },
  infoColor: {
    backgroundColor: theme.COLORS.INFO,
  },
  errorColor: {
    backgroundColor: theme.COLORS.DANGER,
  },
  warningColor: {
    backgroundColor: theme.COLORS.WARNING,
  },
  successColor: {
    backgroundColor: theme.COLORS.SUCCESS,
  },
});
