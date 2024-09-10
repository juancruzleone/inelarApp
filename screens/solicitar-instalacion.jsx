import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa el componente de DatePicker
import Nav from '../components/nav';
import Footer from '../components/footer';

export default function InstalacionScreen() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dispositivo, setDispositivo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("https://inelarweb-back.onrender.com/api/productos");
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error al cargar productos", error);
      }
    };
    loadProducts();
  }, []);

  const handleSolicitud = async () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = {
        nombre,
        telefono,
        direccion,
        dispositivo,
        cantidad,
        fecha: fecha.toISOString().split('T')[0], // Formato de fecha ISO
        category: "instalaciones",
      };

      try {
        const response = await fetch("https://inelarweb-back.onrender.com/api/servicios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const newErrors = {};
          errorData.errors.forEach(err => {
            newErrors[err.field] = err.message;
          });
          setFormErrors(newErrors);
        } else {
          setModalVisible(true);
          resetForm();
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!nombre) errors.nombre = 'El nombre es obligatorio';
    if (!telefono) errors.telefono = 'El teléfono es obligatorio';
    if (!direccion) errors.direccion = 'La dirección es obligatoria';
    if (!dispositivo) errors.dispositivo = 'Selecciona un dispositivo';
    if (!cantidad || cantidad <= 0) errors.cantidad = 'La cantidad debe ser mayor que cero';
    if (!fecha) errors.fecha = 'La fecha es obligatoria';
    return errors;
  };

  const resetForm = () => {
    setNombre('');
    setTelefono('');
    setDireccion('');
    setDispositivo('');
    setCantidad('');
    setFecha(new Date());
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Solicitud de Instalación</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={text => setNombre(text)}
        />
        {formErrors.nombre && <Text style={styles.error}>{formErrors.nombre}</Text>}
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu teléfono"
          value={telefono}
          onChangeText={text => setTelefono(text)}
          keyboardType="numeric"
        />
        {formErrors.telefono && <Text style={styles.error}>{formErrors.telefono}</Text>}
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu dirección"
          value={direccion}
          onChangeText={text => setDireccion(text)}
        />
        {formErrors.direccion && <Text style={styles.error}>{formErrors.direccion}</Text>}

        {/* Picker para dispositivos */}
        <Text style={styles.label}>Dispositivo</Text>
        <Picker
          selectedValue={dispositivo}
          style={styles.input}
          onValueChange={value => setDispositivo(value)}
        >
          <Picker.Item label="Selecciona un dispositivo" value="" />
          {products.map(product => (
            <Picker.Item key={product.id} label={product.name} value={product.name} />
          ))}
        </Picker>
        {formErrors.dispositivo && <Text style={styles.error}>{formErrors.dispositivo}</Text>}

        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe la cantidad"
          value={cantidad}
          onChangeText={text => setCantidad(text)}
          keyboardType="numeric"
        />
        {formErrors.cantidad && <Text style={styles.error}>{formErrors.cantidad}</Text>}

        {/* DateTimePicker para la fecha */}
        <Text style={styles.label}>Fecha deseada</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Selecciona una fecha"
            value={fecha.toISOString().split('T')[0]} // Muestra la fecha en formato ISO
            editable={false} // Desactiva la edición manual
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={fecha}
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
      <Footer />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Solicitud enviada con éxito</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#f57600',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
