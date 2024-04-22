import React, {ReactElement} from 'react';
import {StyleProp, Text as TextComponent, TextStyle} from 'react-native';
import theme from '../themes';
import {normalize} from '../utils/normalize';
interface TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  body?: boolean;
  small?: boolean;
  size?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  muted?: boolean;
  center?: boolean;
  error?: boolean;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  style?: StyleProp<TextStyle>;
  children: string | ReactElement | any;
}
const Text = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  body,
  small,
  size,
  color,
  bold,
  italic,
  muted,
  center,
  textTransform,
  textAlign,
  style,
  children,
  error,
}: TextProps) => {
  return (
    <TextComponent
      style={[
        {fontSize: normalize(14)},
        h1 && {fontSize: normalize(44)},
        h2 && {fontSize: normalize(38)},
        h3 && {fontSize: normalize(30)},
        h4 && {fontSize: normalize(24)},
        h5 && {fontSize: normalize(21)},
        h6 && {fontSize: normalize(18)},
        p && {fontSize: normalize(16)},
        body && {fontSize: normalize(14)},
        small && {fontSize: normalize(12)},
        muted && {color: theme.COLORS.MUTED},
        error && {color: theme.COLORS.DANGER},
        size && {fontSize: size},
        color && {color},
        italic && {fontStyle: 'italic'},
        bold && {fontWeight: 'bold'},
        center && {textAlign: 'center'},
        textTransform && {textTransform: textTransform},
        textAlign && {textAlign},
        style && style,
      ]}>
      {children}
    </TextComponent>
  );
};

export default Text;
