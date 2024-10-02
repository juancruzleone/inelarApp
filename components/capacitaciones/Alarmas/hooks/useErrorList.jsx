import { useState } from 'react';

export const useErrorList = () => {
  const [expandedError, setExpandedError] = useState(null);

  const errors = [
    { id: 'error1',
      title: 'No funciona | E401',
      problem: 'Se observa que el panel de incendio se encuentra fuera de servicio',
      solution: 'Se deberá verificar que el mismo este recibiendo el suministro de energía de alimentación principal 220VCA, el suministro de energía de alimentación secundaria de baterías y si esto es así se debería verificar que la central no se encuentre deteriorada.'
     },

    { id: 'error2',
      title: 'Falla de Alimentación Principal 220VCA | E402',
      problem: 'Se observa que el panel de incendio se encuentra indicando falla en el circuito de alimentación principal',
      solution: 'Se deberá verificar que se encuentre presenta la tensión de 220VCA y si es asi se deberá verificar que la misma se encuentre dentro de los rangos normales de funcionamiento' 
    },

    { id: 'error3',
      title: 'Falla de Alimentación Secundaria Baterías | E403',
      problem: 'Se observa que el panel de incendio se encuentra indicando falla en el circuito de alimentación secundaria',
      solution: 'Se deberá verificar que se encuentre presenta la tensión de baterías y si es asi se deberá verificar que la misma se encuentre dentro de los rangos normales de funcionamiento.' 
    },

    { id: 'error4',
      title: 'Falla de circuitos de detección | E404',
      problem: 'Se observa que el panel de incendio se encuentra indicando falla en el circuito de detección de incendio en donde se encuentran conectados los dispositivos de detección de incendio tales como detectores de humo, detectores de temperatura, avisadores manuales de incendio, etc.',
      solution: 'Se deberá verificar que el cableado del mismo se encuentra en condiciones sin presentar cortes en su cableado, cortocircuitos en los conductores o derivaciones a tierra.' 
    },

    { id: 'error5',
      title: 'Falla de circuitos de sirenas | E405',
      problem: 'Se observa que el panel de incendio se encuentra indicando falla en el circuito de sirenas de incendio en donde se encuentran conectados los dispositivos de notificación tales como sirenas, luces, etc.',
      solution: 'Se deberá verificar que el cableado del mismo se encuentra en condiciones sin presentar cortes en su cableado, cortocircuitos en los conductores o derivaciones a tierra.' 
    },

    { id: 'error6',
      title: 'Falla de circuitos de alimentación de dispositivos | E406',
      problem: 'Se observa que el panel de incendio se encuentra indicando falla en el circuito de alimentación de dispositivos de incendio.',
      solution: 'Se deberá verificar que el cableado del mismo se encuentra en condiciones sin presentar cortes en su cableado, cortocircuitos en los conductores o derivaciones a tierra.' 
    },
  ];

  const toggleError = (id) => {
    setExpandedError(expandedError === id ? null : id);
  };

  return { errors, expandedError, toggleError };
};
