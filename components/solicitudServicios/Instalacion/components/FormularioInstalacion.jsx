import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormularioInstalacion({ formData, setFormData, formErrors, products, showDatePicker, handleDateChange, setShowDatePicker, handleSolicitud }) {
  return (
    <View style={styles.contenido}>
      <Text style={styles.titulo}>Solicitud de Instalación</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={formData.nombre}
        onChangeText={text => setFormData({ ...formData, nombre: text })}
      />
      {formErrors.nombre && <Text style={styles.error}>{formErrors.nombre}</Text>}

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu teléfono"
        value={formData.telefono}
        onChangeText={text => setFormData({ ...formData, telefono: text })}
        keyboardType="numeric"
      />
      {formErrors.telefono && <Text style={styles.error}>{formErrors.telefono}</Text>}

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu dirección"
        value={formData.direccion}
        onChangeText={text => setFormData({ ...formData, direccion: text })}
      />
      {formErrors.direccion && <Text style={styles.error}>{formErrors.direccion}</Text>}

      <Text style={styles.label}>Dispositivo</Text>
      {/*
      <Picker
        selectedValue={formData.dispositivo}
        style={styles.input}
        onValueChange={value => setFormData({ ...formData, dispositivo: value })}
      >
        <Picker.Item label="Selecciona un dispositivo" value="" />
        {products.map(product => (
          <Picker.Item key={product.id} label={product.name} value={product.name} />
        ))}
      </Picker>
      */}
      {formErrors.dispositivo && <Text style={styles.error}>{formErrors.dispositivo}</Text>}

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe la cantidad"
        value={formData.cantidad}
        onChangeText={text => setFormData({ ...formData, cantidad: text })}
        keyboardType="numeric"
      />
      {formErrors.cantidad && <Text style={styles.error}>{formErrors.cantidad}</Text>}

      <Text style={styles.label}>Fecha deseada</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Selecciona una fecha"
          value={formData.fecha.toISOString().split('T')[0]}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {formErrors.fecha && <Text style={styles.error}>{formErrors.fecha}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSolicitud}
      >
        <Text style={styles.buttonText}>Solicitar Instalación</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    marginTop: 60
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    marginBottom: 15,
    width: 340,
    height: 40
  },
  button: {
    backgroundColor: '#f57600',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
