import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.contenedor}>
      <StatusBar style="auto" translucent= {true}/>
      <View style={styles.contenedorBienvenida}>
      </View>
      <View style={styles.contenedorLogo}>
        <Image
              style={styles.imagenLogo}
              source={require('../assets/logo elegido.svg')}
            />
      </View>
      <TouchableOpacity>
        <Text style={styles.textoInicioSesion}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textoRegistrarse}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  contenedorBienvenida: {
    marginTop: 220
  },

  textoBievenida: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },

  contenedorServiciosHome: {
    flexDirection: 'row',
    margin: 60
  },

  cajaServicios: {
    backgroundColor: '#f57600',
    padding: 40,
    height: 140,
    borderRadius: 20,
    margin: 10,
  },

  textoInicioSesion: {
    color: '#fff',
    backgroundColor: '#C75F00',
    padding: 15, 
    marginTop: 20,
    borderRadius: 30,
    width: 200,
    textAlign: 'center'
  },

  textoRegistrarse: {
    color: '#fff',
    backgroundColor: '#ffa24a',
    padding: 15, 
    marginTop: 20,
    borderRadius: 30,
    width: 200,
    textAlign: 'center'
  },

  imagenLogo: {
  }
  }
);
