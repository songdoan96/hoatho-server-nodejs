import {View, Text, Pressable, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const FunctionScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => console.log('hello')}>
        <Text>Đơn nghỉ phép</Text>
      </Pressable>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to AddNews"
        onPress={() => navigation.navigate('AddNew')}
      />
    </View>
  );
};

export default FunctionScreen;
