export const validateUsername = (username) => {
  if (!username) return "El nombre de usuario es requerido.";
  if (username.length < 3) return "El nombre de usuario debe tener al menos 3 caracteres.";
  return null;
};

export const validateEmail = (email) => {
  if (!email) return "El email es requerido.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Por favor, ingrese un email válido.";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "La contraseña es requerida.";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  return null;
};

