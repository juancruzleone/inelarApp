import { useState } from 'react';
import { createInstallation } from '../services/FetchInstalaciones';
import { validateInstallation } from '../utils/Validaciones';

const useInstalaciones = () => {
  const [newInstallation, setNewInstallation] = useState({
    company: "",
    address: "",
    floorSector: "",
    postalCode: "",
    city: "",
    province: "",
    installationType: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (name, value) => {
    setNewInstallation(prev => {
      const updatedInstallation = { ...prev, [name]: value };
      const newErrors = validateInstallation(updatedInstallation);
      setErrors(newErrors);
      return updatedInstallation;
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateInstallation(newInstallation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await createInstallation(newInstallation);
      setIsSuccess(true);
      setNewInstallation({
        company: "",
        address: "",
        floorSector: "",
        postalCode: "",
        city: "",
        province: "",
        installationType: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Error al crear instalación:", error);
      setErrors({ submit: "Error al crear la instalación. Por favor, intente de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSuccess = () => {
    setIsSuccess(false);
  };

  return {
    newInstallation,
    errors,
    isLoading,
    isSuccess,
    handleInputChange,
    handleSubmit,
    setIsSuccess,
    setErrors,
    resetSuccess
  };
};

export default useInstalaciones;