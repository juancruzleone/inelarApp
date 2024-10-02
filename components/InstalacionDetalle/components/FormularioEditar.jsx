import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

const FormularioEditar = ({ 
  selectedDevice, 
  handleSubmit, 
  onClose,
}) => {
  const [device, setDevice] = useState(selectedDevice);
  const [selectedCategory, setSelectedCategory] = useState(selectedDevice.categoria || 'Seleccione una categoría');
  let actionSheetRef = null;

  const categories = ['detector', 'extintor', 'manguera', 'central'];

  const handleChange = (name, value) => {
    setDevice(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCategorySelect = (index) => {
    if (index !== 0) {
      const category = categories[index - 1]; 
      setSelectedCategory(category);
      handleChange('categoria', category);
    }
  };

  const onSubmit = () => {
    handleSubmit(device);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={device.nombre || ''}
          onChangeText={(value) => handleChange('nombre', value)}
          placeholder="Escribe el nombre del dispositivo"
          placeholderTextColor="#999"
        />
        
        <Text style={styles.label}>Ubicación:</Text>
        <TextInput
          style={styles.input}
          value={device.ubicacion || ''}
          onChangeText={(value) => handleChange('ubicacion', value)}
          placeholder="Escribe la ubicación del dispositivo"
          placeholderTextColor="#999"
        />
        
        <Text style={styles.label}>Categoría:</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => actionSheetRef.show()}
        >
          <Text style={styles.selectText}>
            {selectedCategory}
          </Text>
        </TouchableOpacity>
        
        <ActionSheet
          ref={(o) => { actionSheetRef = o; }}
          title={'Seleccionar categoría'}
          options={['Cancelar', ...categories]}
          cancelButtonIndex={0}
          onPress={(index) => handleCategorySelect(index)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonTextCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
    color: 'white',
    backgroundColor: '#2d2d2d',
    width: 260
  },
  selectButton: {
    backgroundColor: 'white',
    color: 'black',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#C75F00',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#2d2d2d',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonTextCancelar: {
    color: 'white',
    textAlign: 'center',
  }
});

export default FormularioEditar;