import { useState } from 'react';

export const useErrorList = () => {
  const [expandedError, setExpandedError] = useState(null);

  const errors = [
    { id: 'error1',
      title: 'Despresurizado | E301',
      problem: 'El extintor presenta baja presión o esta sin presión al observar visualmente su manómetro de presión',
      solution: 'Se deberá enviar el extintor al taller para la verificación de válvula, verificación de carga y posterior presurización.'
     },

    { id: 'error2',
      title: 'Vacío | E302',
      problem: 'El extintor presenta baja presión o esta sin presión al observar visualmente su manómetro de presión y se verifica fala de peso',
      solution: 'Se deberá enviar el extintor al taller para la verificación de válvula, recarga y presurización.'
    },

    { id: 'error3',
      title: 'Manguera deteriorada | E303',
      problem: 'El dispositivo no responde a las verificaciones',
      solution: 'Puede deberse a varios factores tales como pérdida de suministro de energía, se deberá verificar que la alimentación se encuentre presente si esto es así se deberá verificar que el dispositivo no haya sufrido deterioro por pérdida de agua finalmente reemplazar el dispositivo por uno nuevo y volver a realizar las verificaciones.' 
    },

    { id: 'error4',
      title: 'Manómetro deteriorado | E304',
      problem: 'se observa deterioro en el manómetro de presión del extintor',
      solution: 'Se deberá enviar al taller para realizar el reemplazo del manómetro correspondiente y posterior verificación de válvula, verificación de carga y presurización.' 
    },

    { id: 'error5',
      title: 'Pintura | E305',
      problem: 'Se observa deterioro en la pintura del extintor',
      solution: 'Se deberá enviar al taller para realizar el repintado correspondiente, se deberá verificar el estado total del extintor.' 
    },
  ];

  const toggleError = (id) => {
    setExpandedError(expandedError === id ? null : id);
  };

  return { errors, expandedError, toggleError };
};
