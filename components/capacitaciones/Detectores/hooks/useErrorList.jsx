import { useState } from 'react';

export const useErrorList = () => {
  const [expandedError, setExpandedError] = useState(null);

  const errors = [
    { id: 'error1', title: 'Error 1', solution: 'Solución para el Error 1: Verifique las conexiones del detector.' },
    { id: 'error2', title: 'Error 2', solution: 'Solución para el Error 2: Reemplace la batería del detector.' },
    { id: 'error3', title: 'Error 3', solution: 'Solución para el Error 3: Limpie el detector para eliminar polvo.' },
  ];

  const toggleError = (id) => {
    setExpandedError(expandedError === id ? null : id);
  };

  return { errors, expandedError, toggleError };
};
