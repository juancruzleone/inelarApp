import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import BotonAgregarInstalacion from '../components/inicio/components/BotonAgregarInstalacion.jsx';
import CajaServicios from '../components/inicio/components/CajaServicios.jsx';
import ContenedorBienvenida from '../components/inicio/components/ContenedorBienvenida.jsx';
import { useUserName } from '../components/inicio/hooks/useUserName.jsx';

export default function Inicio() {
  const navigation = useNavigation();
  const userName = useUserName();

  const handlePressServicios = () => navigation.navigate('Servicios');
  const handlePressCapacitaciones = () => navigation.navigate('Capacitaciones');
  const handlePressInstalaciones = () => navigation.navigate('Instalaciones');
  const handlePressAgregarInstalacion = () => navigation.navigate('AgregarInstalacion');

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
      <View style={styles.contenedorInstalaciones}>
        <CajaServicios 
          onPress={handlePressInstalaciones} 
          text="Instalaciones" 
          image={require('../assets/instalaciones.png')} 
        />
      </View>
      <BotonAgregarInstalacion onPress={handlePressAgregarInstalacion} />
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
    margin: 35,
    justifyContent: 'space-between',
    width: '80%',
  },
  contenedorInstalaciones: {
    alignItems: 'center',
  },
});
