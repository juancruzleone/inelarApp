import { useState } from 'react';

export const useErrorList = () => {
  const [expandedError, setExpandedError] = useState(null);

  const errors = [
    { id: 'error1',
      title: 'Sucio | E101',
      problem: 'El dispositivo presenta un evento de falla por suciedad o falsa alarma de incendio',
      solution: 'Proceder a limpiar la cámara de detección del dispositivo'
     },

    { id: 'error2',
      title: 'Alarma | E102',
      problem: 'El dispositivo presenta un evento de alarma de incendio',
      solution: 'Si el evento no es debido a la detección de humo real, puede deberse a varios factores que pueden producir la activación del dispositivo tales como suciedad, polvo, tierra, polvillo de Durlock, vapores tales como insecticidas, desodorantes, etc. También puede deberse al deterioro de la electrónica del dispositivo por el ingreso de agua de alguna pérdida o humedad. Se deberá verificar que no exista ninguno de estos factores que puedan haber ocasionado el evento de alarma de incendio, luego proceder a realizar la limpieza de la cámara de detección del dispositivo' 
    },

    { id: 'error3',
      title: 'No funciona | E103',
      problem: 'El dispositivo no responde a las verificaciones',
      solution: 'Puede deberse a varios factores tales como pérdida de suministro de energía, se deberá verificar que la alimentación se encuentre presente si esto es así se deberá verificar que el dispositivo no haya sufrido deterioro por pérdida de agua finalmente reemplazar el dispositivo por uno nuevo y volver a realizar las verificaciones' 
    },
  ];

  const toggleError = (id) => {
    setExpandedError(expandedError === id ? null : id);
  };

  return { errors, expandedError, toggleError };
};
