import { useState, useEffect } from 'react';
import { validateField } from '../../../../components/solicitudServicios/ServicioTecnico/utils/Validaciones.jsx';
import { fetchProducts, submitRequest } from '../../../../components/solicitudServicios/ServicioTecnico/services/FetchSolicitudServicioTecnico.jsx';

export const useSolicitudServicioTecnico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    problema: "",
    fecha: new Date().toISOString().split('T')[0],
    dispositivo: "",
    cantidad: 1,
    category: "técnico", 
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    problema: "",
    fecha: "",
    dispositivo: "",
    cantidad: "",
    general: "",
  });

  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.fecha;
    setFormData((prev) => ({ 
      ...prev, 
      fecha: currentDate.toISOString().split('T')[0] 
    }));
  };

  const handleSolicitud = async () => {
    const errors = validateField(formData);
    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return; 
    }

    try {
      const response = await submitRequest(formData);
      if (response.success) {
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          direccion: "",
          problema: "",
          fecha: new Date().toISOString().split('T')[0],
          dispositivo: "",
          cantidad: 1,
          category: "servicio técnico",
        });
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      setFormErrors((prev) => ({
        ...prev,
        general: err.message || "Ocurrió un error al enviar la solicitud",
      }));
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    handleSolicitud,
    products,
    modalVisible,
    setModalVisible,
    isLoading,
    handleDateChange,
  };
};