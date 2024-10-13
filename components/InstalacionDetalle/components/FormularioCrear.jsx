import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

const FormularioCrear = ({ onSubmit, onClose }) => {
  const [device, setDevice] = useState({ nombre: '', ubicacion: '', categoria: 'Seleccione una categoría' });
  const actionSheetRef = useRef(null);

  const categories = ['detector', 'extintor', 'manguera', 'central'];

  const handleChange = (name, value) => {
    setDevice(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (index) => {
    if (index !== 0) {
      const category = categories[index - 1];
      handleChange('categoria', category);
    }
  };

  const handleSubmit = () => {
    onSubmit(device);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre del dispositivo"
          value={device.nombre}
          onChangeText={(value) => handleChange('nombre', value)}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Ubicación:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe la ubicación del dispositivo"
          value={device.ubicacion}
          onChangeText={(value) => handleChange('ubicacion', value)}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Categoría:</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => actionSheetRef.current.show()}
        >
          <Text style={styles.selectText}>
            {device.categoria}
          </Text>
        </TouchableOpacity>

        <ActionSheet
          ref={actionSheetRef}
          title={'Seleccionar categoría'}
          options={['Cancelar', ...categories]}
          cancelButtonIndex={0}
          onPress={(index) => handleCategorySelect(index)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
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
    width: 260,
  },
  selectButton: {
    backgroundColor: 'white',
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
  },
});

export default FormularioCrear;