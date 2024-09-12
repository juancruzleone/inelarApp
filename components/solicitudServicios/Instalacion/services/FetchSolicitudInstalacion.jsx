export const fetchProducts = async () => {
  try {
    const response = await fetch("https://inelarweb-back.onrender.com/api/productos");
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    return await response.json();
  } catch (error) {
    console.error("Error al cargar productos", error);
    return [];
  }
};

export const submitSolicitud = async (formData) => {
  try {
    const response = await fetch("https://inelarweb-back.onrender.com/api/servicios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        fecha: formData.fecha, 
        category: 'instalaciones',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const newErrors = {};
      errorData.errors.forEach(err => {
        newErrors[err.field] = err.message;
      });
      throw newErrors;
    }
    return { success: true };
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    return { success: false, error };
  }
};