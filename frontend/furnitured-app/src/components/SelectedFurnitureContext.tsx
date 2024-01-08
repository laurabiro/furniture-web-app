import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Furniture } from './T';

type SelectedFurnitureContextType = {
  selectedFurniture: Furniture[]
  orderFurniture: Furniture[] 
  total: number
  amounts: { [itemId: number]: number }
  message: string
  addSelectedFurniture: (furniture: Furniture) => void
  orderSelectedFurniture: (furniture: Furniture) => void
  calculatePrice: (item: Furniture, amount: number) => ReactNode
  updateAmount: (id: number, newAmount: number) => void
  deleteItem: (id: number) => void
}

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
  const [ amounts, setAmounts ] = useState<{ [itemId: number]: number }>({})
  const [ message, setMessage ] = useState<string>("")

  const addSelectedFurniture = (furniture: Furniture) => {

    const isAlreadySelected = selectedFurniture.some(item => item.type === furniture.type)

    if (isAlreadySelected) {

      setSelectedFurniture(prevSelectedFurniture => prevSelectedFurniture.map(item => {
        if (item.type === furniture.type) {
          return furniture
        }
        return item
      }))
    } else {
      setSelectedFurniture(prevSelectedFurniture => [...prevSelectedFurniture, furniture])
    }
  }

  const orderSelectedFurniture = (furniture: Furniture) => {
    if (orderFurniture.some(item => item.id === furniture.id)) {
      if(orderFurniture.length === 0){
        setMessage('')
      }else {
        setMessage('Item is already in the basket')
        setTimeout(() => {
          setMessage("")
      }, 3000)
      }
    }else {
      setOrderFurniture([...orderFurniture, furniture])
      setTotal(total + furniture.price)
      setMessage('Item added to the basket')
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  const calculatePrice = (item: Furniture, amount: number) => {
    const price = item.price * (amount || 1);
    return `${price} $`;
  }

  const updateAmount = (id: number, newAmount: number) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: newAmount,
    }))
  }

  const deleteItem = (id: number) => {
    const updatedBasket = orderFurniture.filter((furniture) => furniture.id !== id);
    setOrderFurniture(updatedBasket);
    setTotal(calculateTotal(updatedBasket))
    const updatedAmounts = { ...amounts }
    delete updatedAmounts[id]
    setAmounts(updatedAmounts)
  }

  const calculateTotal = useCallback((items: Furniture[]) => {
    return items.reduce((acc, item) => {
      const quantity = amounts[item.id] || 1
      return acc + item.price * quantity
    }, 0)
  }, [amounts ])

  useEffect(() => {
    const updatedTotal = calculateTotal(orderFurniture);
    setTotal(updatedTotal)
    // ... Save data to local storage as needed
  }, [ calculateTotal, orderFurniture ])

  return (
    <SelectedFurnitureContext.Provider value={{ 
      selectedFurniture, 
      addSelectedFurniture, 
      orderFurniture, 
      orderSelectedFurniture, 
      total,
      calculatePrice,
      amounts,
      updateAmount,
      deleteItem,
      message }}>

      {children}

    </SelectedFurnitureContext.Provider>
  )
  }