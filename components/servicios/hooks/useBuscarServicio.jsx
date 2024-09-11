import { useState } from 'react';

export const useBuscarServicio = (initialData) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = initialData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
  };

  return { data, search, handleSearch };
};
