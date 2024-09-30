import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

const FormularioCrear = ({ 
  newInstallation, 
  errors, 
  handleSubmit, 
  onClose,
  handleInputChange,
  setErrors
}) => {
  const [selectedCategory, setSelectedCategory] = useState(newInstallation.installationType || 'Seleccione un tipo');
  let actionSheetRef = null;

  const categories = ['Extinción con agua', 'Extinción con gas', 'Detección de incendio'];

  const handleChange = (name, value) => {
    handleInputChange(name, value);
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  const handleCategorySelect = (index) => {
    if (index !== 0) {
      const category = categories[index - 1];
      setSelectedCategory(category);
      handleChange('installationType', category);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.form}>
        <Text style={styles.label}>Empresa:</Text>
        <TextInput
          style={styles.input}
          value={newInstallation.company || ''}
          onChangeText={(value) => handleChange('company', value)}
          placeholder="Escribe el nombre de la empresa"
          placeholderTextColor="#999"
        />
        {errors.company && <Text style={styles.error}>{errors.company}</Text>}
        
        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          value={newInstallation.address || ''}
          onChangeText={(value) => handleChange('address', value)}
          placeholder="Escribe la dirección de la instalación"
          placeholderTextColor="#999"
        />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}
        
        <Text style={styles.label}>Piso/Sector:</Text>
        <TextInput
          style={styles.input}
          value={newInstallation.floorSector || ''}
          onChangeText={(value) => handleChange('floorSector', value)}
          placeholder="Escribe piso/sector de la instalación o edificio"
          placeholderTextColor="#999"
        />
        {errors.floorSector && <Text style={styles.error}>{errors.floorSector}</Text>}
        
        <Text style={styles.label}>Código Postal:</Text>
        <TextInput
          style={styles.input}
          value={newInstallation.postalCode || ''}
          onChangeText={(value) => handleChange('postalCode', value)}
          placeholder="Escribe el código postal"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        {errors.postalCode && <Text style={styles.error}>{errors.postalCode}</Text>}
        
        <Text style={styles.label}>Ciudad:</Text>
        <TextInput
          style={styles.input}
          value={newInstallation.city || ''}
          onChangeText={(value) => handleChange('city', value)}
          placeholder="Escribe la ciudad"
          placeholderTextColor="#999"
        />
        {errors.city && <Text style={styles.error}>{errors.city}</Text>}
        
        <Text style={styles.label}>Provincia:</Text>
        <TextInput
          style={styles.input}
          value={newInstallation.province || ''}
          onChangeText={(value) => handleChange('province', value)}
          placeholder="Escribe la provincia"
          placeholderTextColor="#999"
        />
        {errors.province && <Text style={styles.error}>{errors.province}</Text>}
        
        <Text style={styles.label}>Tipo de instalación:</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => actionSheetRef.show()}
        >
          <Text style={styles.selectText}>
            {selectedCategory}
          </Text>
        </TouchableOpacity>
        {errors.installationType && <Text style={styles.error}>{errors.installationType}</Text>}
        
        <ActionSheet
          ref={(o) => { actionSheetRef = o; }}
          title={'Seleccionar categoría'}
          options={['Cancelar', ...categories]}
          cancelButtonIndex={0}
          onPress={(index) => handleCategorySelect(index)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear</Text>
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
  error: {
    color: 'red',
    marginBottom: 10,
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
    color: 'black',
    textAlign: 'center',
  },
  buttonTextCancelar: {
    color: 'white',
    textAlign: 'center',
  }
});

export default FormularioCrear;