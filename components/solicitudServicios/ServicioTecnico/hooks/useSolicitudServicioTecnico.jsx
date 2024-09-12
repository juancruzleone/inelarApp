// useSolicitudServicioTecnico.jsx
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
    fecha: "",
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

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.fecha;
    setFormData((prev) => ({ ...prev, fecha: currentDate }));
  };

  const handleSolicitud = async () => {
    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((field) => {
      errors[field] = validateField(field, formData[field]);
    });

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return; // Stop submission if there are errors
    }

    try {
      const response = await submitRequest(formData);
      if (response.success) {
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
        // Reset form after successful submission
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          direccion: "",
          problema: "",
          fecha: "",
          dispositivo: "",
          cantidad: 1,
          category: "tecnico",
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
    handleChange,
    handleSolicitud,
    products,
    modalVisible,
    setModalVisible,
    isLoading,
    handleDateChange,
  };
};