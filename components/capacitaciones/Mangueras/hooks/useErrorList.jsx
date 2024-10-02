import { useState } from 'react';

export const useErrorList = () => {
  const [expandedError, setExpandedError] = useState(null);

  const errors = [
    { id: 'error1',
      title: 'Pinchada | E201',
      problem: 'La manguera presenta pinchaduras al realizar la Prueba Hidráulica u al observarlas visualmente',
      solution: 'Se deberá reemplazar la manguera'
    },
    { id: 'error2',
      title: 'Desmandrilada | E202',
      problem: 'La manguera presenta corrimiento de las uniones al realizar la Prueba Hidráulica u al observarlas visualmente se verifica el desmandrilamiento de las uniones',
      solution: 'Se deberán remandrilar las uniones.'
    },
    { id: 'error3',
      title: 'Rota | E203',
      problem: 'La manguera presenta roturas o cortes al realizar la Prueba Hidráulica u al observarlas visualmente',
      solution: 'Se deberá reemplazar la manguera.'
    },
    { id: 'error4',
      title: 'Rosca deteriorada | E204',
      problem: 'La manguera presenta deterioro en las roscas de las uniones al realizar la Prueba Hidráulica u al observarlas visualmente',
      solution: 'Se deberán reemplazar las uniones deterioradas.'
    },
  ];

  const toggleError = (id) => {
    setExpandedError(expandedError === id ? null : id);
  };

  return { errors, expandedError, toggleError };
};
