export const validateForm = (formData) => {
    const errors = {};
    if (!formData.nombre) errors.nombre = 'El nombre es obligatorio';
    if (!formData.telefono) errors.telefono = 'El teléfono es obligatorio';
    if (!formData.direccion) errors.direccion = 'La dirección es obligatoria';
    if (!formData.dispositivo) errors.dispositivo = 'Selecciona un dispositivo';
    if (!formData.cantidad || formData.cantidad <= 0) errors.cantidad = 'La cantidad debe ser mayor que cero';
    if (!formData.fecha) errors.fecha = 'La fecha es obligatoria';
    return errors;
  };
  