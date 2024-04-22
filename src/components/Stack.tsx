import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
interface StackProps {
  children: ReactElement | any;
  flex?: number;
  backgroundColor?: string;
  bg?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  style?: {};
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}
export const VStack = ({
  children,
  flex,
  backgroundColor,
  bg,
  style,
  flexDirection,
  justifyContent,
  ...rest
}: StackProps) => {
  const xStyle = [
    flex && {flex: flex},
    {flexDirection: 'row'},
    flexDirection && {flexDirection: flexDirection},
    backgroundColor && {backgroundColor: backgroundColor},
    bg && {backgroundColor: bg},
    justifyContent && {justifyContent: justifyContent},
    style,
  ];
  return (
    <View style={xStyle} {...rest}>
      {children}
    </View>
  );
};
export const HStack = ({
  children,
  flex,
  backgroundColor,
  bg,
  flexDirection,
  style,
  justifyContent,
  ...rest
}: StackProps) => {
  const yStyle = [
    flex && {flex: flex},
    {flexDirection: 'column'},
    flexDirection && {flexDirection: flexDirection},
    backgroundColor && {backgroundColor: backgroundColor},
    bg && {backgroundColor: bg},
    justifyContent && {justifyContent: justifyContent},
    style,
  ];
  return (
    <View style={yStyle} {...rest}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  test: {flexDirection: 'column', justifyContent: ''},
});
