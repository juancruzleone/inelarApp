export const validateForm = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const currentDate = new Date().setHours(0, 0, 0, 0); 

  if (!formData.nombre.trim()) {
    errors.nombre = 'El nombre es requerido.';
  } else if (formData.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }


  if (!formData.email.trim()) {
    errors.email = 'El email es requerido.';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'El email no es válido.';
  }


  if (!formData.telefono.trim()) {
    errors.telefono = 'El teléfono es requerido.';
  } else if (formData.telefono.length < 10) {
    errors.telefono = 'El teléfono debe tener al menos 10 dígitos.';
  }


  if (!formData.direccion.trim()) {
    errors.direccion = 'La dirección es requerida.';
  }


  if (!formData.dispositivo) {
    errors.dispositivo = 'Debes seleccionar un dispositivo.';
  }


  if (!formData.cantidad.trim()) {
    errors.cantidad = 'La cantidad es requerida.';
  } else if (isNaN(formData.cantidad) || Number(formData.cantidad) <= 0) {
    errors.cantidad = 'La cantidad debe ser un número mayor a 0.';
  }


  if (!formData.fecha) {
    errors.fecha = 'La fecha es requerida.';
  } else {
    const selectedDate = new Date(formData.fecha).setHours(0, 0, 0, 0); // Fecha seleccionada sin horas, minutos y segundos
    if (selectedDate < currentDate) {
      errors.fecha = 'No puedes seleccionar una fecha anterior a la actual.';
    }
  }

  return errors;
};
