import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Nav from '../components/nav';
import Footer from '../components/footer';

export default function Inicio() {
  const [userName, setUserName] = useState('Usuario');
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error loading username:', error);
      }
    };

    loadUserName();
  }, []);

  const handlePressServicios = () => {
    navigation.navigate('Servicios');
  };

  const handlePressCapacitaciones = () => {
    navigation.navigate('Capacitaciones');
  };

  const handlePressAgregarDispositivo = () => {
    navigation.navigate('AgregarDispositivo');
  };

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <View style={styles.contenedorBienvenida}>
        <Text style={styles.textoBienvenida}>¡Hola {userName}!</Text>
      </View>
      <View style={styles.contenedorServiciosHome}>
        <TouchableOpacity onPress={handlePressServicios}>
          <View style={[styles.cajaServicios, { alignItems: 'center', flexBasis: 150 }]}>
            <Text style={styles.textoServicioHome}>Servicios</Text>
            <Image
              style={styles.imagenServicio}
              source={require('../assets/servicios.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressCapacitaciones}>
          <View style={[styles.cajaServicios, { alignItems: 'center', flexBasis: 150 }]}>
            <Text style={styles.textoServicioHome}>Manuales</Text>
            <Image
              style={styles.imagenServicio}
              source={require('../assets/libro.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePressAgregarDispositivo} style={styles.botonAgregarDispositivo}>
        <Text style={styles.textoDispositivo}>Agregar nuevo dispositivo</Text>
      </TouchableOpacity>
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

  contenedorBienvenida: {
    paddingHorizontal: 100,
    borderRadius: 20,
    backgroundColor: '#121212',
    padding: 40,
    marginTop: 60,
  },

  textoBienvenida: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  contenedorServiciosHome: {
    flexDirection: 'row',
    margin: 60,
  },

  cajaServicios: {
    backgroundColor: '#121212',
    padding: 30,
    paddingTop: 20,
    height: 140,
    borderRadius: 20,
    margin: 10,
    marginTop: 40,
  },

  textoServicioHome: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  imagenServicio: {
    width: 60,
    height: 60,
  },

  botonAgregarDispositivo: {
    backgroundColor: '#C75F00',
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 80,
  },

  textoDispositivo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
