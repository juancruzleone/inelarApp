import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

export default function FormularioMantenimiento({
  formData,
  setFormData,
  formErrors,
  products,
  handleDateChange,
  handleSolicitud,
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDatePress = () => {
    setShowPicker(true);
  };

  const renderDatePicker = () => {
    const dateValue = formData.fecha ? new Date(formData.fecha) : new Date();

    return (
      <View style={styles.dateInputContainer}>
        <TouchableOpacity
          onPress={handleDatePress}
          style={styles.dateTextContainer}
        >
          <Text style={styles.dateText}>
            {dateValue.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDatePress}
          style={styles.dateIconContainer}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={dateValue}
            mode="date"
            display="calendar"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                handleDateChange(event, selectedDate);
              }
            }}
            style={styles.datePicker}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.contenido}>
      <Text style={styles.titulo}>Solicitar mantenimiento</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={formData.nombre}
        onChangeText={text => setFormData({ ...formData, nombre: text })}
      />
      {formErrors.nombre && <Text style={styles.error}>{formErrors.nombre}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu email"
        value={formData.email}
        onChangeText={text => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />
      {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}

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
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={value => setFormData({ ...formData, dispositivo: value })}
          items={products.map(product => ({ label: product.name, value: product.name }))}
          placeholder={{ label: 'Selecciona un dispositivo', value: null }}
          style={pickerSelectStyles}
        />
      </View>
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
      {renderDatePicker()}
      {formErrors.fecha && <Text style={styles.error}>{formErrors.fecha}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSolicitud}>
        <Text style={styles.buttonText}>Enviar solicitud</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: 10
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 0,
    width: '100%',
    height: 40,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    height: 40,
  },
  dateTextContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  dateText: {
    paddingLeft: 10,
    color: 'black',
  },
  dateIconContainer: {
    position: 'absolute',
    right: 10,
    top: -2,
    padding: 10,
  },
  datePicker: {
    width: '40%',
    marginRight: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#f57600',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },
  inputAndroid: {
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },
};
