import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Furniture } from './T';

type SelectedFurnitureContextType = {
  selectedFurniture: Furniture[]
  orderFurniture: Furniture[] 
  addSelectedFurniture: (furniture: Furniture) => void
  orderSelectedFurniture: (furniture: Furniture) => void
  total: number
};

const SelectedFurnitureContext = createContext<SelectedFurnitureContextType | undefined>(undefined)

type SelectedFurnitureProviderProps = {
  children: ReactNode
}

export const useSelectedFurniture = () => {
  const context = useContext(SelectedFurnitureContext)
  if (context === undefined) {
    throw new Error('useSelectedFurniture must be used within a SelectedFurnitureProvider')
  }
  return context
};

export const SelectedFurnitureProvider: React.FC<SelectedFurnitureProviderProps> = ({ children }) => {
  const [ selectedFurniture, setSelectedFurniture ] = useState<Furniture[]>([])
  const [ orderFurniture, setOrderFurniture ] = useState<Furniture[] >([])
  const [ total, setTotal ] = useState<number>(0)

  const addSelectedFurniture = (furniture: Furniture) => {
    selectedFurniture.map((item) => {
      item.type !== furniture.type ? setSelectedFurniture([...selectedFurniture, furniture]) : setSelectedFurniture([...selectedFurniture.filter(item => item.type !== furniture.type), furniture])
    })
    
  }
  const orderSelectedFurniture = (furniture: Furniture) => {
    setOrderFurniture([...orderFurniture, furniture ])
    setTotal(total + furniture.price)
  }



  return (
    <SelectedFurnitureContext.Provider value={{ selectedFurniture, addSelectedFurniture, orderFurniture, orderSelectedFurniture, total}}>
      {children}
    </SelectedFurnitureContext.Provider>
  )
}

