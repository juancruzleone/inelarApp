import { useState, useEffect } from 'react';
import { fetchProducts, submitSolicitud } from '../../../../components/solicitudServicios/Instalacion/services/FetchSolicitudInstalacion.jsx';
import { validateForm } from '../utils/Validaciones';

export const useSolicitudInstalacion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    dispositivo: '',
    cantidad: '',
    fecha: new Date(),
  });

  const [products, setProducts] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('calendar');

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    loadProducts();
  }, []);

  const handleSolicitud = async () => {
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const success = await submitSolicitud(formData);
      if (success) {
        setModalVisible(true);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      telefono: '',
      direccion: '',
      dispositivo: '',
      cantidad: '',
      fecha: new Date(),
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.fecha;
    setShowDatePicker(false);
    setFormData({ ...formData, fecha: currentDate });
  };

  const handleDatePress = (mode) => {
    setShowDatePicker(true);
    setDatePickerMode(mode);
  };

  return {
    formData,
    setFormData,
    products,
    formErrors,
    modalVisible,
    setModalVisible,
    showDatePicker,
    setShowDatePicker,
    datePickerMode,
    handleSolicitud,
    resetForm,
    handleDateChange,
    handleDatePress,
  };
};