import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Furniture } from './T';

type SelectedFurnitureContextType = {
  selectedFurniture: Furniture[];
  addSelectedFurniture: (furniture: Furniture) => void;
};

const SelectedFurnitureContext = createContext<SelectedFurnitureContextType | undefined>(undefined);

type SelectedFurnitureProviderProps = {
  children: ReactNode;
};

export const useSelectedFurniture = () => {
  const context = useContext(SelectedFurnitureContext);
  if (context === undefined) {
    throw new Error('useSelectedFurniture must be used within a SelectedFurnitureProvider');
  }
  return context;
};

export const SelectedFurnitureProvider: React.FC<SelectedFurnitureProviderProps> = ({ children }) => {
  const [selectedFurniture, setSelectedFurniture] = useState<Furniture[]>([]);

  const addSelectedFurniture = (furniture: Furniture) => {
    setSelectedFurniture([...selectedFurniture, furniture]);
  };

  return (
    <SelectedFurnitureContext.Provider value={{ selectedFurniture, addSelectedFurniture }}>
      {children}
    </SelectedFurnitureContext.Provider>
  );
};

