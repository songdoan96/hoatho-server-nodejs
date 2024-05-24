import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={[styles.bold, styles.red]}>hòa</Text>
        <Text style={[styles.text]}>cùng thời đại</Text>
      </View>
      <View style={styles.title}>
        <Text style={[styles.bold, styles.blue]}>Thọ</Text>
        <Text style={[styles.text]}>cùng nhân văn</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
  },
  title: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  text: {
    fontSize: 38,
    color: '#000',
    fontWeight: '600',
  },
  bold: {
    fontWeight: '900',
    fontSize: 38,
    textTransform: 'uppercase',
  },
  red: {color: 'red'},
  blue: {color: 'blue'},
});
