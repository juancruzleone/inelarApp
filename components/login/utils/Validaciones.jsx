export const validateUsername = (username) => {
  if (!username) return "El nombre de usuario es requerido.";
  if (username.length < 3) return "El nombre de usuario debe tener al menos 3 caracteres.";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "La contraseña es requerida.";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  return null;
};

export const validateLoginFields = (username, password) => {
  const usernameError = validateUsername(username);
  const passwordError = validatePassword(password);
  
  if (usernameError || passwordError) {
    return usernameError || passwordError;
  }
  
  return null;
};

