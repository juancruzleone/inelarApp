import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav'
import Footer from '../components/footer'

export default function Servicios() {
  const initialData = [
    { id: '1', title: 'Mantenimiento', image: require('../assets/mantenimiento.png') },
    { id: '2', title: 'Instalaciones', image: require('../assets/instalaciones.png') },
    { id: '3', title: 'Provisiones', image: require('../assets/provisiones.png') },
    { id: '4', title: 'Servicio Técnico', image: require('../assets/servicio-tecnico.png') },
  ];

  const navigation = useNavigation();

  const handlePress = (title) => {
    switch (title) {
      case 'Mantenimiento':
        navigation.navigate('SolicitudMantenimiento');
        break;
      case 'Instalaciones':
        navigation.navigate('SolicitudInstalacion');
        break;
      case 'Provisiones':
        navigation.navigate('SolicitudProvision');
        break;
      case 'Servicio Técnico':
        navigation.navigate('SolicitudServiciotecnico');
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
            source={require('../assets/servicios.png')}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    alignItems: 'center',
  },
  containerBook: {
    display: 'flex',
    marginTop: 40,
    marginBottom: 40
  },
  tituloServicio: {
    color: 'white',
    fontSize: 30,
    marginBottom: 40
  }
});

