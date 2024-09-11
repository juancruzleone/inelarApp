import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemsServicios({ item, handlePress }) {
  return (
    <TouchableOpacity onPress={() => handlePress(item.title)}>
      <View style={styles.item}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#121212',
    padding: 20,
    height: 200,
    borderRadius: 30,
    margin: 0,
    width: '90%',
    marginBottom: 20,
    alignItems: 'center',
    marginRight: 25,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});