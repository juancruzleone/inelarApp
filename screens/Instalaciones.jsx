import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from '@alessiocancian/react-native-actionsheet'; 
import Nav from '../components/nav';
import Footer from '../components/footer';
import { useInstallations } from '../components/instaalaciones/hooks/useInstalaciones.jsx'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Importación de iconos

export default function Instalaciones() {
  const navigation = useNavigation();
  const { installations, loading, error } = useInstallations(); 
  const [filteredInstallations, setFilteredInstallations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas'); 

  const categories = ["Todas", "Detección de incendio", "Extinción con agua", "Extinción con gas"];
  let actionSheetRef = null;

  useEffect(() => {
    setFilteredInstallations(installations);
  }, [installations]);

  const handleSearch = (text) => {
    setSearch(text);
    filterInstallations(text, category);
  };

  const handleCategoryFilter = (index) => {
    const selectedCategory = categories[index];
    setCategory(selectedCategory);
    filterInstallations(search, selectedCategory);
  };

  const filterInstallations = (searchText, categoryText) => {
    const filtered = installations.filter((item) => {
      const matchesCompany = item.company && typeof item.company === 'string' && item.company.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = 
        categoryText === "Todas" || 
        (item.installationType && typeof item.installationType === 'string' && item.installationType.toLowerCase().includes(categoryText.toLowerCase()));
      return matchesCompany && matchesCategory;
    });
    setFilteredInstallations(filtered);
  };

  const handlePress = (installation) => {
    navigation.navigate('InstalacionDetalle', { installation }); 
  };

  const handleEdit = (installation) => {
    // Lógica para editar la instalación
    console.log("Editar instalación:", installation);
  };

  const handleDelete = (installationId) => {
    // Lógica para eliminar la instalación
    console.log("Eliminar instalación con ID:", installationId);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          <Text style={styles.title}>{item.company || 'Sin nombre'}</Text>
          <Text style={styles.category}>{item.installationType || 'Sin categoría'}</Text> 
        </TouchableOpacity>
        <View style={styles.deviceActions}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
            <MaterialIcons name="edit" size={30} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
            <MaterialIcons name="delete" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C75F00" />
        <Text style={styles.loadingText}>Cargando instalaciones...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <View style={styles.containerBook}>
        <Image
          style={styles.book}
          source={require('../assets/instalaciones.png')}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar instalación"
          placeholderTextColor="black"
          value={search}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => actionSheetRef.show()}
        >
          <Text style={styles.selectText}>
            {category || 'Seleccionar categoría'}
          </Text>
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={(o) => (actionSheetRef = o)}
        title={'Seleccionar categoría'}
        options={['Cancel', ...categories]}
        cancelButtonIndex={0}
        onPress={(index) => {
          if (index !== 0) handleCategoryFilter(index - 1);
        }}
      />
      <View style={styles.containerList}>
        <FlatList
          data={filteredInstallations}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d1d',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  containerBook: {
    alignItems: 'center',
    marginTop: 20,
  },
  book: {
    width: 200,
    height: 200,
  },
  searchContainer: {
    margin: 20,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  selectText: {
    fontSize: 16,
    color: 'black',
  },
  containerList: {
    flex: 1,
    paddingHorizontal: 10,
    
   },
  
   item: {
     marginVertical:10,
     backgroundColor:'#121212',
     borderRadius :10,
     paddingVertical :20,
     paddingHorizontal :15
   },
   image: {
     width:100,
     height :100,
     borderRadius :50,
   },
   title: {
     marginTop :10,
     fontSize :16,
     fontWeight :'bold',
     color :'white'
   },
   category:{
     marginTop :5,
     fontSize :14,
     color :'white'
   },
   deviceActions:{
     flexDirection:'row',     
     marginTop :20, 
   },
   editButton:{
     marginRight: 20
   },
   errorText:{
     color:'red',
     textAlign:'center',
     marginTop :20
   }
});