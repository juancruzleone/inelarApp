import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav'
import Footer from '../components/footer'

export default function Capacitaciones() {
  const initialData = [
    { id: '1', title: 'Detectores', image: require('../assets/detector.png') },
    { id: '2', title: 'Mangueras', image: require('../assets/manguera.png') },
    { id: '3', title: 'Extintores', image: require('../assets/extintor.png') },
    { id: '4', title: 'Centrales', image: require('../assets/central.png') },
  ];

  const navigation = useNavigation();

  const handlePress = (title) => {
    switch (title) {
      case 'Detectores':
        navigation.navigate('CapacitacionDetectores');
        break;
      case 'Mangueras':
        navigation.navigate('CapacitacionMangueras');
        break;
      case 'Extintores':
        navigation.navigate('CapacitacionExtintores');
        break;
      case 'Centrales':
        navigation.navigate('CapacitacionAlarmas');
        break;
      default:
        break;
    }
  };

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = initialData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.title)}>
        <View style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <View style={styles.containerBook}>
        <Image
          style={styles.book}
          source={require('../assets/libro.png')}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar"
          placeholderTextColor="black"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchContainer: {
    marginTop: 40,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
    width: 300,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#121212',
    padding: 20,
    height: 200,
    borderRadius: 30,
    margin: 0,
    width: '90%',
    marginBottom: 20,
    alignItems: 'center',
    marginRight: 25
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  book: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  containerList: {
    marginTop: 20,
    width: '90%',
    marginLeft: 20,
    alignItems: 'center',
  },
  containerBook: {
    display: 'flex',
    marginTop: 35,
  }
});
