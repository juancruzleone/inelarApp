import { useState, useEffect } from 'react';
import { fetchProducts, submitSolicitud } from '../../../../components/solicitudServicios/Instalacion/services/FetchSolicitudInstalacion.jsx';
import { validateForm } from '../../../../components/solicitudServicios/Instalacion/utils/Validaciones.jsx';

export const useSolicitudProvision = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    dispositivo: '',
    cantidad: '',
    fecha: new Date().toISOString().split('T')[0], 
  });

  const [formErrors, setFormErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts();
      setProducts(productsData);
    }

    loadProducts();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setFormData({ ...formData, fecha: selectedDate.toISOString().split('T')[0] });
    }
  };

  const handleSolicitud = async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const response = await submitSolicitud(formData);
      if (response.success) {
        setModalVisible(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          dispositivo: '',
          cantidad: '',
          fecha: new Date().toISOString().split('T')[0],
        });
      }
    } else {
      setFormErrors(errors);
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    modalVisible,
    setModalVisible,
    products,
    handleSolicitud,
    handleDateChange,
  };
};