export const validateField = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const currentDate = new Date().setHours(0, 0, 0, 0);

  // Validar el campo 'nombre'
  if (!formData.nombre || !formData.nombre.trim()) {
    errors.nombre = 'El nombre es requerido.';
  } else if (formData.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }

  // Validar el campo 'email'
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'El email es requerido.';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'El email no es válido.';
  }

  // Validar el campo 'telefono'
  if (!formData.telefono || !formData.telefono.trim()) {
    errors.telefono = 'El teléfono es requerido.';
  } else if (formData.telefono.length < 10) {
    errors.telefono = 'El teléfono debe tener al menos 10 dígitos.';
  }

  // Validar el campo 'direccion'
  if (!formData.direccion || !formData.direccion.trim()) {
    errors.direccion = 'La dirección es requerida.';
  }

  // Validar el campo 'dispositivo'
  if (!formData.dispositivo) {
    errors.dispositivo = 'Debes seleccionar un dispositivo.';
  }

  // Validar el campo 'cantidad'
  if (!formData.cantidad || formData.cantidad.toString().trim() === "") {
    errors.cantidad = 'La cantidad es requerida.';
  } else if (isNaN(formData.cantidad) || Number(formData.cantidad) <= 0) {
    errors.cantidad = 'La cantidad debe ser un número mayor a 0.';
  }

  // Validar el campo 'fecha'
  if (!formData.fecha) {
    errors.fecha = 'La fecha es requerida.';
  } else {
    const selectedDate = new Date(formData.fecha).setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      errors.fecha = 'No puedes seleccionar una fecha anterior a la actual.';
    }
  }

  // Validar el campo 'problema'
  if (!formData.problema || !formData.problema.trim()) {
    errors.problema = 'El problema es requerido.';
  }

  return errors;
};