// src/HeatmapContext.jsx
import React, { createContext, useState, useContext } from 'react';

const HeatmapContext = createContext();

export const useHeatmap = () => {
  return useContext(HeatmapContext);
};

export const HeatmapProvider = ({ children }) => {
  const [isEmitting, setIsEmitting] = useState(true);

  return (
    <HeatmapContext.Provider value={{ isEmitting, setIsEmitting }}>
      {children}
    </HeatmapContext.Provider>
  );
};
