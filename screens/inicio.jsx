import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import Footer from '../components/footer';
import BotonAgregarDispositivo from '../components/inicio/components/BotonAgregarDispositivo.jsx';
import CajaServicios from '../components/inicio/components/CajaServicios.jsx';
import ContenedorBienvenida from '../components/inicio/components/ContenedorBienvenida.jsx';
import { useUserName } from '../components/inicio/hooks/useUserName.jsx';

export default function Inicio() {
  const navigation = useNavigation();
  const userName = useUserName();

  const handlePressServicios = () => navigation.navigate('Servicios');
  const handlePressCapacitaciones = () => navigation.navigate('Capacitaciones');
  const handlePressAgregarDispositivo = () => navigation.navigate('AgregarDispositivo');

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <ContenedorBienvenida userName={userName} />
      <View style={styles.contenedorServiciosHome}>
        <CajaServicios 
          onPress={handlePressServicios} 
          text="Servicios" 
          image={require('../assets/servicios.png')} 
        />
        <CajaServicios 
          onPress={handlePressCapacitaciones} 
          text="Manuales" 
          image={require('../assets/libro.png')} 
        />
      </View>
      <BotonAgregarDispositivo onPress={handlePressAgregarDispositivo} />
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
  contenedorServiciosHome: {
    flexDirection: 'row',
    margin: 60,
  },
});
