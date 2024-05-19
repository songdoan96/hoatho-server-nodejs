import React from 'react';
import {MD2Colors, Text} from 'react-native-paper';

const TextError = ({children}: any) => {
  return (
    <Text style={{paddingTop: 4, color: MD2Colors.red600}}>{children}</Text>
  );
};

export default TextError;
