import { useState, useCallback, useEffect } from 'react';
import { fetchInstallations, updateInstallation, deleteInstallation } from '../services/FetchInstalaciones';
import { validateInstallation } from '../utils/Validaciones';

const useInstalaciones = () => {
  const [installations, setInstallations] = useState([]);
  const [filteredInstallations, setFilteredInstallations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [search, setSearch] = useState("");
  const [editErrors, setEditErrors] = useState({});

  const fetchInstallationsData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchInstallations();
      if (result.error) {
        throw new Error(result.error);
      }
      if (Array.isArray(result)) {
        setInstallations(result);
        setFilteredInstallations(result);
        const uniqueCategories = [...new Set(result.map(installation => installation.installationType))];
        setCategories(uniqueCategories);
      } else {
        throw new Error("Formato de respuesta de API inesperado");
      }
    } catch (error) {
      console.error("Error al obtener las instalaciones:", error);
      setError(error.message);
      setInstallations([]);
      setFilteredInstallations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstallationsData();
  }, [fetchInstallationsData]);

  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModal(false);
    fetchInstallationsData();
  };

  const handleEditInstallation = (installation) => {
    setSelectedInstallation({ ...installation });
    setEditModal(true);
    setEditErrors({});
  };

  const handleDeleteInstallation = (installation) => {
    setSelectedInstallation({ ...installation });
    setDeleteModal(true);
  };

  const handleCloseModal = () => {
    setEditModal(false);
    setDeleteModal(false);
    setEditErrors({});
  };

  const handleEditSubmit = async () => {
    const validationErrors = validateInstallation(selectedInstallation);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }
    try {
      await updateInstallation(selectedInstallation._id, selectedInstallation);
      handleCloseModal();
      showSuccessModal("Instalación editada exitosamente");
    } catch (error) {
      console.error("Error al editar la instalación:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedInstallation) {
      console.error("No se ha seleccionado ninguna instalación para eliminar");
      return;
    }
    try {
      await deleteInstallation(selectedInstallation._id);
      handleCloseModal();
      showSuccessModal("Instalación eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la instalación:", error);
    }
  };

  const handleEditInputChange = (name, value) => {
    setSelectedInstallation((prev) => {
      const updatedInstallation = { ...prev, [name]: value };
      const newErrors = validateInstallation(updatedInstallation);
      setEditErrors(newErrors);
      return updatedInstallation;
    });
  };

  return {
    installations,
    filteredInstallations,
    setFilteredInstallations,
    loading,
    error,
    categories,
    selectedCategory,
    editModal,
    deleteModal,
    successModal,
    successMessage,
    selectedInstallation,
    search,
    editErrors,
    setEditModal,
    setDeleteModal,
    setSelectedCategory,
    setSearch,
    setEditErrors,
    handleEditInstallation,
    handleDeleteInstallation,
    handleCloseModal,
    handleEditInputChange,
    handleEditSubmit,
    handleDeleteSubmit,
    handleSuccessModalClose,
  };
};

export default useInstalaciones;