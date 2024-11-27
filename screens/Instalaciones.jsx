import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import Nav from '../components/nav';
import Footer from '../components/footer';
import useInstalaciones from '../components/instaalaciones/hooks/useInstalaciones';
import { MaterialIcons } from '@expo/vector-icons';
import ModalEditar from '../components/instaalaciones/components/ModalEditar';
import ModalEliminarInstalacion from '../components/instaalaciones/components/ModalEliminar';
import ModalExito from '../components/instaalaciones/components/ModalExito';
import { useTheme } from '../components/theme/ThemeContext';

export default function Instalaciones() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const {
    installations,
    filteredInstallations,
    setFilteredInstallations,
    loading,
    error,
    handleEditInstallation,
    handleDeleteInstallation,
    handleCloseModal,
    handleEditSubmit,
    handleDeleteSubmit,
    handleEditInputChange,
    editModal,
    deleteModal,
    successModal,
    successMessage,
    setEditModal,
    setDeleteModal,
    selectedInstallation,
    editErrors,
    setEditErrors,
    categories,
    handleSuccessModalClose,
  } = useInstalaciones();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const allCategories = ["Todas", ...categories];
  let actionSheetRef = null;

  const handleSearch = (text) => {
    setSearch(text);
    filterInstallations(text, category);
  };

  const handleCategoryFilter = (index) => {
    const selectedCategory = allCategories[index];
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

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item, { backgroundColor: theme.menuBackground }]}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          <Text style={[styles.title, { color: theme.text }]}>{item.company || 'Sin nombre'}</Text>
          <Text style={[styles.category, { color: theme.text }]}>{item.installationType || 'Sin categoría'}</Text>
        </TouchableOpacity>
        <View style={styles.deviceActions}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEditInstallation(item)}>
            <MaterialIcons name="edit" size={30} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteInstallation(item)}>
            <MaterialIcons name="delete" size={30} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.buttonBackground} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Cargando instalaciones...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={[styles.errorText, { color: theme.text }]}>Error: {error}</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
          style={[styles.searchBar, { backgroundColor: theme.menuBackground, color: theme.text }]}
          placeholder="Buscar instalación"
          placeholderTextColor={theme.text}
          value={search}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={[styles.selectButton, { backgroundColor: theme.buttonBackground }]}
          onPress={() => actionSheetRef.show()}
        >
          <Text style={[styles.selectText, { color: theme.buttonText }]}>
            {category || 'Seleccionar categoría'}
          </Text>
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={(o) => (actionSheetRef = o)}
        title={'Seleccionar categoría'}
        options={['Cancel', ...allCategories]}
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
          ListFooterComponent={<View style={styles.footerSpace} />}
        />
      </View>
      <ModalEditar
        isOpen={editModal}
        handleClose={() => setEditModal(false)}
        selectedInstallation={selectedInstallation}
        errors={editErrors}
        handleSubmit={handleEditSubmit}
        handleEditInputChange={handleEditInputChange}
        setErrors={setEditErrors}
        categories={categories}
      />
      <ModalEliminarInstalacion
        isOpen={deleteModal}
        onRequestClose={() => setDeleteModal(false)}
        onConfirm={handleDeleteSubmit}
        isDeleting={false}
      />
      <ModalExito
        isOpen={successModal}
        onClose={handleSuccessModalClose}
        message={successMessage}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  containerBook: {
    alignItems: 'center',
    marginTop: 20,
  },
  book: {
    width: 100,
    height: 100,
  },
  searchContainer: {
    margin: 20,
  },
  searchBar: {
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  selectButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  selectText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    marginTop: 5,
    fontSize: 14,
  },
  deviceActions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  editButton: {
    marginRight: 20,
  },
  deleteButton: {},
  footerSpace: {
    height: 100, 
  },
  errorText: {
    color: 'red',
  },
});

