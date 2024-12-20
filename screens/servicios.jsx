import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';
import ItemsServicios from '../components/servicios/components/ItemsServicios.jsx';
import { useBuscarServicio } from '../components/servicios/hooks/useBuscarServicio.jsx'; 
import { serviciosData } from '../components/servicios/components/ListaServicios.jsx'; 
import { useTheme } from '../components/theme/ThemeContext';

export default function Servicios() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
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

  const { data } = useBuscarServicio(serviciosData); 

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      
      <View style={styles.containerBook}>
        <Image style={styles.book} source={require('../assets/servicios.png')} />
      </View>

      <View style={styles.containerList}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ItemsServicios 
              item={item} 
              handlePress={handlePress} 
              theme={theme}
            />
          )}
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  book: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  containerList: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  containerBook: {
    display: 'flex',
    marginTop: 40,
    marginBottom: 40,
  },
});

